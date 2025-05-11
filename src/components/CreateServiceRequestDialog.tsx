// src/components/CreateServiceRequestDialog.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { colors } from '../app/open-props/lib/colors.stylex'
import { fonts } from '../app/open-props/lib/fonts.stylex'
import { sizes } from '../app/open-props/lib/sizes.stylex'
import { borders } from '../app/open-props/lib/borders.stylex'
import { shadows } from '../app/open-props/lib/shadows.stylex'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ServiceRequestMutationInput } from '@/types/index'
import useSupabase from 'src/hooks/useSupabase'
import { addServiceRequestMutation } from 'src/queries/addServiceRequest'

interface CreateServiceRequestDialogProps {
  locationId?: string
  serviceTypeId?: string
  technicianId?: string
  onClose: () => void
  open: boolean
  onSuccess?: () => void
  statusOptions: { id: string; name: string }[]
  serviceTypeOptions: { id: string; name: string }[]
  locationOptions: { id: string; name: string }[]
  technicianOptions: { id: string; name: string }[]
  hideLocationSelect?: boolean
  hideServiceTypeSelect?: boolean
  hideTechnicianSelect?: boolean
}

const styles = stylex.create({
  dialog: {
    padding: {
      default: sizes.spacing4,
      '@media (max-width: 600px)': sizes.spacing3,
    },
    borderRadius: borders.radius2,
    maxWidth: '500px',
    width: {
      default: '100%',
      '@media (max-width: 600px)': `calc(100% - ${sizes.spacing10})`,
    },
    maxHeight: {
      '@media (max-width: 600px)': '90vh',
    },
    overflowY: 'auto',
    margin: 'auto',
    background: colors.stone1,
    color: colors.stone12,
    boxShadow: shadows.shadow3,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: {
      default: sizes.spacing3,
      '@media (max-width: 600px)': sizes.spacing2,
    },
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: sizes.spacing2,
  },
  label: {
    fontWeight: fonts.weight4,
    fontSize: {
      default: fonts.size1,
      '@media (max-width: 600px)': fonts.size0,
    },
  },
  input: {
    padding: {
      default: `${sizes.spacing2} ${sizes.spacing3}`,
      '@media (max-width: 600px)': sizes.spacing2,
    },
    borderRadius: borders.radius2,
    border: `1px solid ${colors.stone3}`,
    fontSize: fonts.size1,
    width: '100%',
    boxSizing: 'border-box',
  },
  textarea: {
    padding: {
      default: `${sizes.spacing2} ${sizes.spacing3}`,
      '@media (max-width: 600px)': sizes.spacing2,
    },
    borderRadius: borders.radius2,
    border: `1px solid ${colors.stone3}`,
    fontSize: fonts.size1,
    minHeight: {
      default: sizes.spacing12,
      '@media (max-width: 600px)': sizes.spacing10,
    },
    resize: 'vertical',
    width: '100%',
    boxSizing: 'border-box',
  },
  select: {
    padding: {
      default: `${sizes.spacing2} ${sizes.spacing3}`,
      '@media (max-width: 600px)': sizes.spacing2,
    },
    borderRadius: borders.radius2,
    border: `1px solid ${colors.stone3}`,
    fontSize: fonts.size1,
    width: '100%',
    boxSizing: 'border-box',
    background: colors.stone1,
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: {
      default: 'flex-end',
      '@media (max-width: 600px)': 'space-between',
    },
    gap: sizes.spacing3,
    marginTop: sizes.spacing4,
  },
  cancelButton: {
    padding: {
      default: `${sizes.spacing2} ${sizes.spacing4}`,
      '@media (max-width: 600px)': `${sizes.spacing2} ${sizes.spacing3}`,
    },
    borderRadius: borders.radius2,
    border: `1px solid ${colors.stone3}`,
    background: 'transparent',
    cursor: 'pointer',
    fontSize: fonts.size1,
    minWidth: {
      '@media (max-width: 600px)': sizes.spacing8,
    },
    ':hover': {
      background: colors.stone2,
    },
  },
  submitButton: {
    padding: {
      default: `${sizes.spacing2} ${sizes.spacing4}`,
      '@media (max-width: 600px)': `${sizes.spacing2} ${sizes.spacing3}`,
    },
    borderRadius: borders.radius2,
    border: `1px solid ${colors.stone3}`,
    backgroundColor: {
      default: marigoldColors.leafHighlight,
      ':hover': marigoldColors.flowerGold,
    },
    color: marigoldColors.foregroundButton,
    cursor: 'pointer',
    fontSize: fonts.size1,
    textDecoration: 'none',

    minWidth: {
      '@media (max-width: 600px)': sizes.spacing8,
    },
    ':disabled': {
      background: colors.stone0,
      cursor: 'not-allowed',
    },
    placeItems: 'center',
    display: 'grid',
    transitionDuration: '500ms',
    transitionProperty: 'backgroundColor',
  },
  errorMessage: {
    color: colors.red0,
    fontSize: fonts.size0,
    marginTop: sizes.spacing1,
  },
  successMessage: {
    color: colors.green0,
    fontSize: fonts.size0,
    marginTop: sizes.spacing1,
  },
  techniciansList: {
    display: 'flex',
    flexDirection: 'column',
    gap: sizes.spacing2,
    marginTop: sizes.spacing2,
  },
  technicianItem: {
    display: 'flex',
    alignItems: 'center',
    gap: sizes.spacing2,
  },
})

export default function CreateServiceRequestDialog({
  locationId,
  serviceTypeId,
  technicianId,
  onClose,
  open,
  onSuccess,
  statusOptions,
  serviceTypeOptions,
  locationOptions = [],
  technicianOptions = [],
  hideLocationSelect = false,
  hideServiceTypeSelect = false,
  hideTechnicianSelect = false,
}: CreateServiceRequestDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const client = useSupabase()
  const queryClient = useQueryClient()

  // Extended form data to include technician assignments
  const [formData, setFormData] = useState<
    ServiceRequestMutationInput & {
      technician_ids?: string[]
    }
  >({
    description: '',
    location_id: locationId || '',
    service_type_id: serviceTypeId || '',
    status_id: statusOptions[0]?.id || '',
    details: '',
    technician_ids: technicianId ? [technicianId] : [],
  })

  const [formError, setFormError] = useState<string | null>(null)

  // Effect to control the dialog open/close state
  useEffect(() => {
    if (open && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal()
    } else if (!open && dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close()
    }
  }, [open])

  // When locationId, serviceTypeId, or technicianId props change, update form data
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      location_id: locationId || prevData.location_id,
      service_type_id: serviceTypeId || prevData.service_type_id,
      technician_ids: technicianId
        ? [...(prevData.technician_ids || []).filter((id) => id !== technicianId), technicianId]
        : prevData.technician_ids,
    }))
  }, [locationId, serviceTypeId, technicianId])

  // Extended mutation function to handle technician assignments
  const mutation = useMutation({
    mutationFn: async (data: ServiceRequestMutationInput & { technician_ids?: string[] }) => {
      // First create the service request
      const { technician_ids, ...serviceRequestData } = data
      const newServiceRequest = await addServiceRequestMutation(client, serviceRequestData)

      // If we have technicians to assign and the service request was created successfully
      if (technician_ids?.length && newServiceRequest?.id) {
        // Create technician assignments
        const { error } = await client.from('service_request_technicians').insert(
          technician_ids.map((techId) => ({
            service_request_id: newServiceRequest.id,
            technician_id: techId,
          })),
        )

        if (error) {
          throw error
        }
      }

      return newServiceRequest
    },
    onSuccess: (newServiceRequest) => {
      // Invalidate all service request queries
      queryClient.invalidateQueries({
        predicate: (query) => {
          return Array.isArray(query.queryKey) && query.queryKey[0] === 'serviceRequests'
        },
      })

      // Force refetch for specific contexts
      if (locationId) {
        const filterStr = JSON.stringify({ locationId })
        queryClient.refetchQueries({
          predicate: (query) => {
            return (
              Array.isArray(query.queryKey) &&
              query.queryKey[0] === 'serviceRequests' &&
              query.queryKey[1] === filterStr
            )
          },
        })
      } else if (serviceTypeId) {
        const filterStr = JSON.stringify({ serviceTypeId })
        queryClient.refetchQueries({
          predicate: (query) => {
            return (
              Array.isArray(query.queryKey) &&
              query.queryKey[0] === 'serviceRequests' &&
              query.queryKey[1] === filterStr
            )
          },
        })
      } else if (technicianId) {
        // Also handle technician context
        queryClient.refetchQueries({
          predicate: (query) => {
            return Array.isArray(query.queryKey) && query.queryKey[0] === 'serviceRequests'
          },
        })
      }

      // Direct cache update attempt for immediate feedback
      try {
        // Find relevant filter string
        const filterString = JSON.stringify(locationId ? { locationId } : serviceTypeId ? { serviceTypeId } : {})

        const queryCache = queryClient.getQueryCache()
        const matchingQueries = queryCache.findAll({
          predicate: (query) => {
            return (
              Array.isArray(query.queryKey) &&
              query.queryKey[0] === 'serviceRequests' &&
              query.queryKey[1] === filterString
            )
          },
        })

        matchingQueries.forEach((query) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          queryClient.setQueryData(query.queryKey, (oldData: any) => {
            if (!oldData || !oldData.data) return oldData

            return {
              ...oldData,
              data: [newServiceRequest, ...oldData.data],
              totalCount: (oldData.totalCount || 0) + 1,
            }
          })
        })
      } catch (err) {
        console.error('Error updating cache:', err)
      }

      // Reset form
      setFormData({
        description: '',
        location_id: locationId || '',
        service_type_id: serviceTypeId || '',
        status_id: statusOptions[0]?.id || '',
        details: '',
        technician_ids: technicianId ? [technicianId] : [],
      })

      // Call success callback and close dialog
      if (onSuccess) onSuccess()
      onClose()
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setFormError(error.message || 'Failed to create service request')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.description) {
      setFormError('Description is required')
      return
    }

    if (!formData.location_id) {
      setFormError('Location is required')
      return
    }

    // Clear any previous errors
    setFormError(null)

    // Submit the form
    mutation.mutate(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle technician selection/deselection
  const handleTechnicianChange = (techId: string, checked: boolean) => {
    setFormData((prev) => {
      const currentTechIds = prev.technician_ids || []

      if (checked && !currentTechIds.includes(techId)) {
        return { ...prev, technician_ids: [...currentTechIds, techId] }
      } else if (!checked && currentTechIds.includes(techId)) {
        return { ...prev, technician_ids: currentTechIds.filter((id) => id !== techId) }
      }

      return prev
    })
  }

  return (
    <dialog ref={dialogRef} {...stylex.props(styles.dialog)} onClose={onClose}>
      <h2>Create New Service Request</h2>

      <form onSubmit={handleSubmit} {...stylex.props(styles.form)}>
        <div {...stylex.props(styles.formGroup)}>
          <label htmlFor='description' {...stylex.props(styles.label)}>
            Description *
          </label>
          <input
            id='description'
            name='description'
            type='text'
            value={formData.description || ''}
            onChange={handleChange}
            required
            {...stylex.props(styles.input)}
          />
        </div>

        {/* Location select - conditionally rendered */}
        {!hideLocationSelect && (
          <div {...stylex.props(styles.formGroup)}>
            <label htmlFor='location_id' {...stylex.props(styles.label)}>
              Location *
            </label>
            <select
              id='location_id'
              name='location_id'
              value={formData.location_id || ''}
              onChange={handleChange}
              required
              {...stylex.props(styles.select)}>
              <option value=''>Select a location</option>
              {locationOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Service Type select - conditionally rendered */}
        {!hideServiceTypeSelect && (
          <div {...stylex.props(styles.formGroup)}>
            <label htmlFor='service_type_id' {...stylex.props(styles.label)}>
              Service Type
            </label>
            <select
              id='service_type_id'
              name='service_type_id'
              value={formData.service_type_id || ''}
              onChange={handleChange}
              {...stylex.props(styles.select)}>
              <option value=''>Select a service type</option>
              {serviceTypeOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div {...stylex.props(styles.formGroup)}>
          <label htmlFor='status_id' {...stylex.props(styles.label)}>
            Status
          </label>
          <select
            id='status_id'
            name='status_id'
            value={formData.status_id || ''}
            onChange={handleChange}
            {...stylex.props(styles.select)}>
            <option value=''>Select a status</option>
            {statusOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Technician selection - conditionally rendered */}
        {!hideTechnicianSelect && technicianOptions.length > 0 && (
          <div {...stylex.props(styles.formGroup)}>
            <label {...stylex.props(styles.label)}>Assign Technicians</label>
            <div {...stylex.props(styles.techniciansList)}>
              {technicianOptions.map((tech) => (
                <div key={tech.id} {...stylex.props(styles.technicianItem)}>
                  <input
                    type='checkbox'
                    id={`tech-${tech.id}`}
                    checked={formData.technician_ids?.includes(tech.id) || false}
                    onChange={(e) => handleTechnicianChange(tech.id, e.target.checked)}
                  />
                  <label htmlFor={`tech-${tech.id}`}>{tech.name}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div {...stylex.props(styles.formGroup)}>
          <label htmlFor='details' {...stylex.props(styles.label)}>
            Details
          </label>
          <textarea
            id='details'
            name='details'
            value={formData.details || ''}
            onChange={handleChange}
            {...stylex.props(styles.textarea)}
          />
        </div>

        {formError && <div {...stylex.props(styles.errorMessage)}>{formError}</div>}

        {mutation.isSuccess && (
          <div {...stylex.props(styles.successMessage)}>Service request created successfully!</div>
        )}

        <div {...stylex.props(styles.buttonGroup)}>
          <button type='button' onClick={onClose} {...stylex.props(styles.cancelButton)}>
            Cancel
          </button>
          <button type='submit' disabled={mutation.isPending} {...stylex.props(styles.submitButton)}>
            {mutation.isPending ? 'Creating...' : 'Create Service Request'}
          </button>
        </div>
      </form>
    </dialog>
  )
}
