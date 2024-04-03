export default async function NewServicetype() {
  const addServicetype = async (formData: FormData) => {
    'use server'
    const service_name = formData.get('service_name')
    //const supabase = createServerActionClient('')
    // get title from input
    // write a new servicetype to supabase
    // fetch fresh data
  }
  return (
    <div></div>
    // <form action={addServicetype}>
    // <input name="service_name"/>
    // </form>
  )
}
