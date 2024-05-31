import '../../App.css'
import { ClientOnly } from './client'
export function generateStaticParams() {
  return [
    { slug: [] }, // for the root
    // { slug: ['about'] },
    // { slug: ['services'] },
    // { slug: ['career'] },
    // { slug: ['career-detail', 'slug'] }, // Replace 'some-slug' with actual slugs
    // { slug: ['blogs'] },
    // { slug: ['blog-detail', 'slug'] }, // Replace 'some-slug' with actual slugs
    // { slug: ['contact-us'] },
    // { slug: ['terms-conditions'] },
    // { slug: ['privacy-policy'] },
    // { slug: ['uxui-design-and-audit'] },
    // { slug: ['back-office-support'] },
    // { slug: ['software-development'] },
    // { slug: ['quality-assurance-service'] },
    // { slug: ['contact-center-management'] },
  ];
}

// /Assets/services/Group24.png



 
export default function Page() {
  return  <ClientOnly />
}