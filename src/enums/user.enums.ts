export type iAdminRoles = 'CORE_ADMIN' | 'CORE_MANAGER';
export type iVendorRoles = 'VENDOR_ADMIN' | 'VENODR_MANAGER';
export type iClientRoles = 'CUSTOMER';
export type iUserRoles = iAdminRoles | iVendorRoles | iClientRoles;

//
export const USER_ROLES: iUserRoles[] = [
  'CORE_ADMIN',
  'CORE_MANAGER',
  'VENDOR_ADMIN',
  'VENODR_MANAGER',
  'CUSTOMER',
];

export type iAdminPermissions =
  | {
      name: 'manage_vendors';
      label: 'Manage Vendors';
      permissions: ['read', 'write', 'delete'];
    }
  | {
      name: 'manage_features';
      label: 'Manage Features';
      permissions: ['read', 'write', 'delete'];
    };

export type iVendorPermissions =
  | {
      name: 'manage_vendors';
      label: 'Manage Vendors';
      permissions: ['read', 'write', 'delete'];
    }
  | {
      name: 'manage_features';
      label: 'Manage Features';
      permissions: ['read', 'write', 'delete'];
    };

export const CORE_ADMIN_ROLES = [];
export const CORE_ADMIN_PERMISSIONS = [];
