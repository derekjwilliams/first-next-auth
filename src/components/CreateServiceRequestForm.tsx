// src/components/CreateServiceRequestForm.tsx
'use client'

import { useState, useEffect } from 'react'
import * as stylex from '@stylexjs/stylex'
import { spacingPatterns } from '../app/customStyles/spacingPatterns.stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'
import { shadows } from '@derekjwilliams/stylextras-open-props-pr/shadows.stylex'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ServiceRequestMutationInput } from '@/types/index'
import useSupabase from 'src/hooks/useSupabase'
import { addServiceRequestMutation } from 'src/queries/addServiceRequest'
import { serviceTypes } from '../utils/serviceTypes'
import { useRouter } from 'next/navigation'

interface CreateServiceRequestFormProps {
  locationId?: string
  serviceTypeId?: string
  technicianId?: string
  statusOptions: { id: string; name: string }[]
  serviceTypeOptions: { id: string; name: string }[]
  locationOptions: { id: string; name: string }[]
  technicianOptions: { id: string; name: string }[]
  hideLocationSelect?: boolean
  hideServiceTypeSelect?: boolean
  hideTechnicianSelect?: boolean
}

const styles = stylex.create({
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: marigoldColors.backgroundTextarea,
    color: marigoldColors.foreground,
    padding: {
      default: sizes.spacing6,
      '@media (max-width: 600px)': sizes.spacing4,
    },
  },
  header: {
    marginBottom: sizes.spacing6,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: {
      default: sizes.spacing4,
      '@media (max-width: 600px)': spacingPatterns.gapMedium,
    },
    backgroundColor: marigoldColors.backgroundTextarea,

    padding: {
      default: sizes.spacing6,
      '@media (max-width: 600px)': sizes.spacing4,
    },
    borderRadius: borders.radius2,
    boxShadow: shadows.shadow2,
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
    width: '100%',
    padding: spacingPatterns.gapSmall,
    borderWidth: borders.size1,
    borderColor: marigoldColors.textInputBorder,
    // borderRadius: borders.radius1,
    fontFamily: fonts.sans,
    fontSize: fonts.size1,
    border: `1px solid ${marigoldColors.textInputBackground}`,
    backgroundColor: marigoldColors.textInputBackground,
    ':focus': {
      outline: 'none',
      borderColor: marigoldColors.primary,
      boxShadow: `0 0 0 2px ${marigoldColors.primary}33`,
    },
    color: marigoldColors.textInputColor,
  },
  textarea: {
    padding: {
      default: `${sizes.spacing2} ${spacingPatterns.gapMedium}`,
      '@media (max-width: 600px)': sizes.spacing2,
    },
    ':focus': {
      outline: 'none',
      borderColor: marigoldColors.primary,
      boxShadow: `0 0 0 2px ${marigoldColors.primary}33`,
    },
    borderRadius: borders.radius2,
    border: `1px solid ${marigoldColors.textInputBackground}`,
    fontSize: fonts.size1,
    minHeight: {
      default: '2rem',
      '@media (max-width: 600px)': '2rem',
    },
    resize: 'vertical',
    width: '100%',
    boxSizing: 'border-box',
    background: marigoldColors.textInputBackground,
    color: marigoldColors.textInputColor,
  },
  select: {
    padding: {
      default: spacingPatterns.gapSmall,
      '@media (max-width: 600px)': spacingPatterns.gapSmall,
    },
    ':focus': {
      outline: 'none',
      borderColor: marigoldColors.primary,
      boxShadow: `0 0 0 2px ${marigoldColors.primary}33`,
    },
    borderRadius: borders.radius2,
    border: `1px solid ${marigoldColors.textInputBackground}`,
    fontSize: fonts.size1,
    width: '100%',
    boxSizing: 'border-box',
    background: marigoldColors.textInputBackground,
    color: marigoldColors.textInputColor,
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: {
      default: 'flex-end',
      '@media (max-width: 600px)': 'space-between',
    },
    gap: spacingPatterns.gapMedium,
    marginTop: spacingPatterns.gapLarge,
  },
  cancelButton: {
    padding: {
      default: `${spacingPatterns.gapSmall} ${spacingPatterns.gapMedium}`,
      '@media (max-width: 600px)': `${sizes.spacing2} ${spacingPatterns.gapMedium}`,
    },
    borderRadius: borders.radius2,
    border: `1px solid ${marigoldColors.backgroundButton}`,
    background: 'transparent',
    cursor: 'pointer',
    fontSize: fonts.size1,
    minWidth: {
      '@media (max-width: 600px)': sizes.spacing8,
    },
    ':hover': {
      background: marigoldColors.backgroundHoverButton,
      color: marigoldColors.foregroundHoverButton,
    },
    color: marigoldColors.foregroundButton,
  },
  submitButton: {
    padding: {
      default: `${spacingPatterns.gapSmall} ${spacingPatterns.gapMedium}`,
      '@media (max-width: 600px)': `${sizes.spacing2} ${spacingPatterns.gapMedium}`,
    },
    borderRadius: borders.radius2,
    border: `1px solid ${marigoldColors.backgroundButton}`,
    background: marigoldColors.backgroundButton,
    cursor: 'pointer',
    fontSize: fonts.size1,
    minWidth: {
      '@media (max-width: 600px)': sizes.spacing8,
    },
    ':hover': {
      background: marigoldColors.backgroundHoverButton,
      color: marigoldColors.foregroundHoverButton,
    },
    color: marigoldColors.foregroundButton,
  },
  errorMessage: {
    color: marigoldColors.error,
    fontSize: fonts.size1,
    marginTop: spacingPatterns.gapTiny,
    padding: spacingPatterns.gapMedium,
    backgroundColor: marigoldColors.errorBackground,
    borderRadius: borders.radius1,
    border: `1px solid ${marigoldColors.error}`,
  },
  successMessage: {
    color: marigoldColors.success,
    fontSize: fonts.size1,
    marginTop: spacingPatterns.gapTiny,
    padding: spacingPatterns.gapMedium,
    backgroundColor: marigoldColors.successBackground,
    borderRadius: borders.radius1,
    border: `1px solid ${marigoldColors.success}`,
  },
  techniciansList: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingPatterns.gapSmall,
    marginTop: spacingPatterns.gapSmall,
  },
  technicianItem: {
    display: 'flex',
    alignItems: 'center',
    gap: spacingPatterns.gapSmall,
  },
})

export default function CreateServiceRequestForm({
  locationId,
  serviceTypeId,
  technicianId,
  statusOptions,
  serviceTypeOptions,
  locationOptions = [],
  technicianOptions = [],
  hideLocationSelect = false,
  hideServiceTypeSelect = false,
  hideTechnicianSelect = false,
}: CreateServiceRequestFormProps) {
  const client = useSupabase()
  const queryClient = useQueryClient()
  const router = useRouter()

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
  const [formSuccess, setFormSuccess] = useState<string | null>(null)

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
      queryClient.invalidateQueries({ queryKey: ['multipleServiceRequests'], refetchType: 'inactive' }) // invalidate query for table
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

      // Show success message
      setFormSuccess('Service request created successfully!')

      // Redirect to the service request detail page after a short delay
      setTimeout(() => {
        // Navigate to the detail page of the newly created service request
        router.push(`/servicerequests/${newServiceRequest.id}`)
      }, 1000)
    },
    onError: (error: unknown) => {
      let message = 'Failed to create service request'

      if (error instanceof Error) {
        message = error.message
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        message = (error as { message: string }).message
      }

      setFormError(message)
      window.scrollTo(0, 0)
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

    if (!formData.service_type_id) {
      setFormError('Service type is required')
      return
    }

    // Clear any previous errors
    setFormError(null)
    setFormSuccess(null)

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
        return {
          ...prev,
          technician_ids: currentTechIds.filter((id) => id !== techId),
        }
      }

      return prev
    })
  }

  const serviceType = serviceTypeOptions.find((e) => e.id === formData.service_type_id)
  const serviceTypeName = serviceType ? serviceType.name : ''
  const serviceTypeDisplayName = serviceTypes.get(serviceTypeName)?.displayName ?? serviceTypeName

  const locationLabel = locationOptions.find((lo) => lo.id === locationId)?.name
  const technicialLabel = technicianOptions.find((v) => v.id === technicianId)?.name
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.header)}>
        <h1>
          {(locationLabel || technicialLabel || serviceTypeDisplayName) && (
            <span>
              Create Service Request for {locationLabel} {technicialLabel} {serviceTypeDisplayName}
            </span>
          )}
          {!(locationLabel || technicialLabel || serviceTypeDisplayName) && <span>Create Service Request</span>}
        </h1>
      </div>

      {formError && <div {...stylex.props(styles.errorMessage)}>{formError}</div>}
      {formSuccess && <div {...stylex.props(styles.successMessage)}>{formSuccess}</div>}

      <form
        onSubmit={handleSubmit}
        {...stylex.props(styles.form)}>
        <div {...stylex.props(styles.formGroup)}>
          <label
            htmlFor='description'
            {...stylex.props(styles.label)}>
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
            <label
              htmlFor='location_id'
              {...stylex.props(styles.label)}>
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
                <option
                  key={option.id}
                  value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Service Type select - conditionally rendered */}
        {!hideServiceTypeSelect && (
          <div {...stylex.props(styles.formGroup)}>
            <label
              htmlFor='service_type_id'
              {...stylex.props(styles.label)}>
              Service Type *
            </label>
            <select
              id='service_type_id'
              name='service_type_id'
              value={formData.service_type_id || ''}
              onChange={handleChange}
              required
              {...stylex.props(styles.select)}>
              <option value=''>Select a service type</option>
              {serviceTypeOptions.map((option) => (
                <option
                  key={option.id}
                  value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div {...stylex.props(styles.formGroup)}>
          <label
            htmlFor='status_id'
            {...stylex.props(styles.label)}>
            Status *
          </label>
          <select
            id='status_id'
            name='status_id'
            value={formData.status_id || ''}
            onChange={handleChange}
            required
            {...stylex.props(styles.select)}>
            <option value=''>Select a status</option>
            {statusOptions.map((option) => (
              <option
                key={option.id}
                value={option.id}>
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
                <div
                  key={tech.id}
                  {...stylex.props(styles.technicianItem)}>
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
          <label
            htmlFor='details'
            {...stylex.props(styles.label)}>
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

        <div {...stylex.props(styles.buttonGroup)}>
          <button
            type='button'
            onClick={() => router.back()}
            {...stylex.props(styles.cancelButton)}>
            Cancel
          </button>
          <button
            type='submit'
            disabled={mutation.isPending}
            {...stylex.props(styles.submitButton)}>
            {mutation.isPending ? 'Creating...' : 'Create Service Request'}
          </button>
        </div>
      </form>
    </div>
  )
}
