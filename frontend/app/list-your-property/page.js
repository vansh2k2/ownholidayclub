import React from 'react'
import ListYourProperty from '@/components/pages/ListYourProperty/ListYourProperty'
import { getStaticPageMetadata } from "@/lib/metadata";

export const metadata = getStaticPageMetadata("/list-your-property");

function page() {
  return (
    <div>
      <ListYourProperty />
    </div>
  )
}

export default page
