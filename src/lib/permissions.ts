// lib/permissions.ts

export interface UserAttributes {
  id: string
  roles: string[]
  department: string | null
  // Add other relevant attributes: location, clearance, etc.
}

export interface ResourceAttributes {
  ownerId?: string
  department?: string
  sensitivity?: 'public' | 'internal' | 'confidential'
  // Add other relevant attributes: project, tags, etc.
}

type Action = 'read' | 'edit' | 'delete' | 'create'

/**
 * The core ABAC policy decision point (PDP).
 * Determines if a user can perform an action on a resource.
 */
export function can(user: UserAttributes | null, action: Action, resource?: ResourceAttributes): boolean {
  if (!user) {
    // Deny access if user is not authenticated, except for public reads
    if (action === 'read' && resource?.sensitivity === 'public') {
      return true
    }
    return false
  }

  // Admin override (example)
  if (user.roles.includes('admin')) {
    return true
  }

  switch (action) {
    case 'read':
      if (resource?.sensitivity === 'public') {
        return true
      }
      if (resource?.sensitivity === 'internal' && resource?.department === user.department) {
        return true
      }
      if (resource?.sensitivity === 'confidential' && resource?.ownerId === user.id) {
        return true // Only owner can read confidential
      }
      // Fallthrough denial for read
      return false

    case 'edit':
      // Only editors can edit documents they own
      return user.roles.includes('editor') && resource?.ownerId === user.id

    case 'delete':
      // Only admins can delete (handled by admin override above)
      // If we didn't have the admin override:
      // return user.roles.includes('admin');
      return false // Denied if not admin

    case 'create':
      // Example: Any authenticated user with a department can create
      return !!user.department

    default:
      return false // Deny any unknown action
  }
}
