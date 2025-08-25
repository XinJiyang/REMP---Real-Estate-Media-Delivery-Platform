import React, { useState, useEffect } from 'react'
import { X, Loader2 } from 'lucide-react'

interface LocationPopupProps {
  isOpen: boolean
  onClose: () => void
  initialLatitude?: number | null
  initialLongitude?: number | null
  onSave?: (latitude: number, longitude: number) => void
  isLoading?: boolean
}

const LocationPopup: React.FC<LocationPopupProps> = ({
  isOpen,
  onClose,
  initialLatitude = null,
  initialLongitude = null,
  onSave,
  isLoading = false
}) => {
  const [latitude, setLatitude] = useState<string>('')
  const [longitude, setLongitude] = useState<string>('')
  const [errors, setErrors] = useState<{ latitude?: string; longitude?: string }>({})

  useEffect(() => {
    if (initialLatitude !== null) {
      setLatitude(initialLatitude.toString())
    }
    if (initialLongitude !== null) {
      setLongitude(initialLongitude.toString())
    }
  }, [initialLatitude, initialLongitude])

  const validateCoordinates = (): boolean => {
    const newErrors: { latitude?: string; longitude?: string } = {}
    
    if (!latitude) {
      newErrors.latitude = 'Latitude is required'
    } else {
      const latValue = parseFloat(latitude)
      if (isNaN(latValue)) {
        newErrors.latitude = 'Must be a valid number'
      } else if (latValue < -90 || latValue > 90) {
        newErrors.latitude = 'Must be between -90 and 90'
      }
    }

    if (!longitude) {
      newErrors.longitude = 'Longitude is required'
    } else {
      const longValue = parseFloat(longitude)
      if (isNaN(longValue)) {
        newErrors.longitude = 'Must be a valid number'
      } else if (longValue < -180 || longValue > 180) {
        newErrors.longitude = 'Must be between -180 and 180'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateCoordinates() && onSave) {
      onSave(parseFloat(latitude), parseFloat(longitude))
      onClose()
    }
  }

  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(e.target.value)
  }

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongitude(e.target.value)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl p-6">
        <div className="flex flex-col justify-between mb-3">
          <button
            onClick={onClose}
            className="ml-auto text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
          <h2 className="text-md font-semibold text-gray-800">Property Location</h2>
          <p className="text-xs">Enter the latitude and longitude coordinates for the property.</p>
        </div>

        <div className="h-[1.5px] bg-[#F2F2F2]"></div>

        <form onSubmit={handleSubmit}>
          <div className="my-6 space-y-4">
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                Latitude
              </label>
              <input
                type="text"
                id="latitude"
                className={`w-full p-3 bg-[#F3F3F3] rounded-md text-gray-700 focus:outline-none ${
                  errors.latitude ? 'border border-red-500' : ''
                }`}
                value={latitude}
                onChange={handleLatitudeChange}
                placeholder="Enter latitude (e.g., -33.865143)"
                disabled={isLoading}
              />
              {errors.latitude && (
                <p className="mt-1 text-xs text-red-500">{errors.latitude}</p>
              )}
            </div>

            <div>
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                Longitude
              </label>
              <input
                type="text"
                id="longitude"
                className={`w-full p-3 bg-[#F3F3F3] rounded-md text-gray-700 focus:outline-none ${
                  errors.longitude ? 'border border-red-500' : ''
                }`}
                value={longitude}
                onChange={handleLongitudeChange}
                placeholder="Enter longitude (e.g., 151.209900)"
                disabled={isLoading}
              />
              {errors.longitude && (
                <p className="mt-1 text-xs text-red-500">{errors.longitude}</p>
              )}
            </div>
          </div>

          <div className="border-t border-gray-[#F2F2F2] flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="text-sm py-2 w-24 text-center border-2 border-black text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm py-2 w-24 bg-[#14a2ea] text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LocationPopup