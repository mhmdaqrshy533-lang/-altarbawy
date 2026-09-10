import React, { createContext, useContext, useState, useEffect } from 'react';
import { EducationRole, EducationRoleID, EDUCATION_ROLES } from '../types/roles';
import { EducationStandardsEngine } from '../core/standards/EducationStandardsEngine';

export interface NationalHeaderInfo {
  republic: string;
  ministry: string;
  office: string;
  directorate: string;
  schoolName: string;
  academicYear: string;
  term: string;
  officialTitleName: string;
  authorName: string;
  logoType: 'yemen_republic' | 'custom' | 'none';
  customLogoUrl?: string;
  showSeal: boolean;
  showQR: boolean;
  developerCredit: string;
}

interface RoleContextType {
  currentRole: EducationRole;
  setRole: (roleId: EducationRoleID) => void;
  headerInfo: NationalHeaderInfo;
  updateHeaderInfo: (info: Partial<NationalHeaderInfo>) => void;
  allRoles: EducationRole[];
}

const getInitialHeaderInfo = (): NationalHeaderInfo => {
  const activeProfile = EducationStandardsEngine.getActiveProfile();
  return {
    republic: activeProfile.authority.countryName,
    ministry: activeProfile.authority.ministry,
    office: activeProfile.authority.governorateOrRegion,
    directorate: activeProfile.authority.directorate,
    schoolName: activeProfile.authority.schoolName,
    academicYear: activeProfile.authority.academicYear,
    term: activeProfile.authority.termName,
    officialTitleName: 'مكتب أستاذ المادة',
    authorName: 'المعلم المشرف',
    logoType: 'custom',
    showSeal: activeProfile.header.showEmblem,
    showQR: true,
    developerCredit: 'الرقيم - المنصة الوطنية للوثائق التعليمية | برمجة وتطوير المهندس//:سهيل الهزبري'
  };
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoleId, setCurrentRoleId] = useState<EducationRoleID>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('raq_active_role');
      if (saved && EDUCATION_ROLES[saved as EducationRoleID]) {
        return saved as EducationRoleID;
      }
    }
    return 'teacher';
  });

  const [headerInfo, setHeaderInfo] = useState<NationalHeaderInfo>(() => {
    const defaultInfo = getInitialHeaderInfo();
    if (typeof window !== 'undefined') {
      const savedHeader = localStorage.getItem('raq_header_info');
      if (savedHeader) {
        try {
          return { ...defaultInfo, ...JSON.parse(savedHeader) };
        } catch (e) {
          console.error(e);
        }
      }
    }
    return defaultInfo;
  });

  // Sync when EducationStandardsEngine active profile changes
  useEffect(() => {
    const unsub = EducationStandardsEngine.subscribe(() => {
      const active = EducationStandardsEngine.getActiveProfile();
      setHeaderInfo(prev => ({
        ...prev,
        republic: active.authority.countryName,
        ministry: active.authority.ministry,
        office: active.authority.governorateOrRegion,
        directorate: active.authority.directorate,
        schoolName: active.authority.schoolName,
        academicYear: active.authority.academicYear,
        term: active.authority.termName,
      }));
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('raq_active_role', currentRoleId);
    }
  }, [currentRoleId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('raq_header_info', JSON.stringify(headerInfo));
    }
  }, [headerInfo]);

  const setRole = (roleId: EducationRoleID) => {
    if (EDUCATION_ROLES[roleId]) {
      setCurrentRoleId(roleId);
      // Automatically update official header title based on role
      setHeaderInfo(prev => ({
        ...prev,
        officialTitleName: EDUCATION_ROLES[roleId].officialTitle
      }));
    }
  };

  const updateHeaderInfo = (info: Partial<NationalHeaderInfo>) => {
    setHeaderInfo(prev => ({ ...prev, ...info }));
  };

  const currentRole = EDUCATION_ROLES[currentRoleId] || EDUCATION_ROLES.teacher;
  const allRoles = Object.values(EDUCATION_ROLES);

  return (
    <RoleContext.Provider value={{ currentRole, setRole, headerInfo, updateHeaderInfo, allRoles }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
