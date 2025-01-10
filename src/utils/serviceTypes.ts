interface DisplayAndImage {
  id: string
  displayName: string
  image: string
}
export const serviceTypes = new Map<string, DisplayAndImage>()

serviceTypes.set('Safety', { id: '', displayName: 'Safety', image: 'safety.svg' })
serviceTypes.set('Hvac', { id: '', displayName: 'Heating and Cooling', image: 'heating_and_cooling.svg' })
serviceTypes.set('Pests', { id: '', displayName: 'Pests', image: 'pests.svg' })
serviceTypes.set('Safety', { id: '', displayName: 'Safety', image: 'safety.svg' })
serviceTypes.set('FloorsWallsDoorsWindows', {
  id: '',
  displayName: 'Floors Walls Doors Windows',
  image: 'doors_and_windows.svg',
})
serviceTypes.set('Electrical', { id: '', displayName: 'Electrical', image: 'electrical.svg' })
serviceTypes.set('Broadband', { id: '', displayName: 'Broadband', image: 'broadband.svg' })
serviceTypes.set('Laundry', { id: '', displayName: 'Laundry', image: 'laundry.svg' })
serviceTypes.set('Locks', { id: '', displayName: 'Safety', image: 'lock.svg' })
serviceTypes.set('Dishwasher', { id: '', displayName: 'Dishwasher', image: 'dishwasher.svg' })
serviceTypes.set('Refrigerator', { id: '', displayName: 'Refrigerator', image: 'refrigerator.svg' })
serviceTypes.set('KitchenPlumbing', { id: '', displayName: 'Kitchen Plumbing', image: 'kitchen_under_plumbing.svg' })
serviceTypes.set('BathroomPlumbing', { id: '', displayName: 'Bathroom Plumbing', image: 'bathroom_plumbing.svg' })
serviceTypes.set('WaterHeater', { id: '', displayName: 'Water Heater', image: 'water_heater.svg' })
serviceTypes.set('RoofGutters', { id: '', displayName: 'Roof and Gutters', image: 'roof.svg' })
serviceTypes.set('TreesLawnLandscaping', { id: '', displayName: 'Lawn and Landscaping', image: 'tree.svg' })
