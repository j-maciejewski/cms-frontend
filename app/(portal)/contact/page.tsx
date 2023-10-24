import { ContactForm, PageWrapper, Spinner } from '@/components/portal'

export default async function () {
  return (
    <PageWrapper>
      <h6 className="mb-6 border-l-4 border-primary px-4 text-lg font-medium tracking-wider">Contact us</h6>
      <ContactForm />
    </PageWrapper>
  )
}
