import type { ReactNode } from "react";
import { ScrollText, Shield, type LucideIcon } from "lucide-react";

export interface LegalSection {
  title: string;
  content: ReactNode;
}

export interface LegalPageContent {
  icon: LucideIcon;
  title: string;
  accent: string;
  lastUpdated: string;
  intro: ReactNode;
  sections: LegalSection[];
}

const privacyPolicySections: LegalSection[] = [
  {
    title: "1. Information We Collect",
    content: (
      <div className="space-y-4">
        <p>We may collect both personal and non-personal information in various ways, including when you visit our website, engage with our services, or communicate with us. The types of information we collect include:</p>
        <div>
          <h4 className="text-white font-semibold text-[14px]">1.1 Personal Identification Information</h4>
          <p className="mt-1 text-sm text-body-secondary">This may include your name, email address, phone number, company name, and other details you provide when contacting us via our website&apos;s contact form or engaging with our services.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[14px]">1.2 Service-Related Information</h4>
          <p className="mt-1 text-sm text-body-secondary">When working with brands or creators, we collect details relevant to the services provided, such as campaign details, social media accounts, content preferences, and agreements.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[14px]">1.3 Third-Party Services</h4>
          <p className="mt-1 text-sm text-body-secondary">We use third-party services such as Google Analytics to analyze user activity on our website. These services use cookies and other technologies to gather data, but this information is used for statistical purposes and does not personally identify users. Additionally, we use Cloudflare to enhance the security and performance of our website.</p>
        </div>
      </div>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <div className="space-y-4">
        <p>We use the information we collect for the following purposes:</p>
        <div>
          <h4 className="text-white font-semibold text-[14px]">2.1 To Provide Services</h4>
          <p className="mt-1 text-sm text-body-secondary">We use your personal information to respond to inquiries, process service requests, and manage influencer marketing campaigns, talent management, social media management, and other services we offer.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[14px]">2.2 For Analytics and Performance</h4>
          <p className="mt-1 text-sm text-body-secondary">We use Google Analytics to analyze website usage, gather insights, and improve our services. This helps us understand how users interact with our website to offer a more efficient and tailored experience.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[14px]">2.3 For Website Security</h4>
          <p className="mt-1 text-sm text-body-secondary">We use Cloudflare to enhance the security and performance of our website. This service helps protect against cyber threats and ensures smooth operation.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[14px]">2.4 To Communicate with You</h4>
          <p className="mt-1 text-sm text-body-secondary">If you&apos;ve provided contact information, we may send you updates, promotions, or service-related notices (only if you have opted in).</p>
        </div>
      </div>
    ),
  },
  {
    title: "3. Cookies and Tracking Technologies",
    content: (
      <>
        <p>We use cookies and other tracking technologies to enhance your experience on our website. Cookies are small files stored on your device that help us remember your preferences and monitor website traffic.</p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li><strong>Google Analytics:</strong> We use Google Analytics to track website activity and analyze usage patterns. This helps us improve our website and services based on user behavior.</li>
          <li><strong>Cloudflare:</strong> Cloudflare uses cookies to provide security and performance improvements, helping us to protect our website from malicious attacks.</li>
        </ul>
        <p className="mt-4">You can manage or disable cookies through your browser settings. Please note that disabling cookies may affect certain website features.</p>
      </>
    ),
  },
  {
    title: "4. Data Security",
    content: (
      <>
        <p>We take reasonable measures to protect your personal information from unauthorized access, alteration, or destruction. Our website is protected by SSL encryption, and we store your data securely on servers that are protected against cyber threats.</p>
        <p className="mt-4">While we take significant steps to protect your data, please be aware that no method of electronic storage or transmission is entirely secure. We cannot guarantee the absolute security of your data.</p>
      </>
    ),
  },
  {
    title: "5. Data Sharing",
    content: (
      <div className="space-y-4">
        <p>We respect your privacy and do not sell, trade, or rent your personal data. However, we may share your information in the following circumstances:</p>
        <div>
          <h4 className="text-white font-semibold text-[14px]">5.1 Service Providers</h4>
          <p className="mt-1 text-sm text-body-secondary">We may share your information with trusted third-party service providers who assist us in delivering services, processing payments, and supporting business operations. These providers are obligated to protect your data and only use it for the purposes for which it was provided.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[14px]">5.2 Business Partners</h4>
          <p className="mt-1 text-sm text-body-secondary">If you are a brand or creator engaging in campaigns with us, we may share necessary campaign-related information with influencers, talent, or other partners directly involved in executing the campaign. All data shared is done so to facilitate the provision of services, and we ensure that these parties comply with our privacy standards.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[14px]">5.3 Legal Requirements</h4>
          <p className="mt-1 text-sm text-body-secondary">We may disclose your information if required by law, such as in response to a court order or subpoena, or when necessary to protect the rights, property, or safety of Vynox Media, its clients, or others.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[14px]">5.4 Business Transfers</h4>
          <p className="mt-1 text-sm text-body-secondary">In the event of a merger, acquisition, or sale of Vynox Media, your personal information may be transferred as part of the business assets.</p>
        </div>
      </div>
    ),
  },
  {
    title: "6. Your Rights",
    content: (
      <>
        <p>
          You have the right to access, correct, or delete the personal information we hold about you. You may also object to the processing of your data or request a restriction on how we use your data in certain circumstances.
        </p>
        <p className="mt-4">
          If you wish to exercise any of these rights or have questions about how your data is being used, please contact us through the contact form on our website or email us at <a href="mailto:hello@vynoxmedia.com" className="text-primary hover:underline">hello@vynoxmedia.com</a>.
        </p>
      </>
    ),
  },
  {
    title: "7. Third-Party Links",
    content: (
      <p>
        Our website may contain links to external websites not operated by Vynox Media. We are not responsible for the privacy practices or content of these third-party websites. We recommend reviewing the privacy policies of any third-party sites you visit.
      </p>
    ),
  },
  {
    title: "8. Data Retention",
    content: (
      <p>
        We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, unless a longer retention period is required or permitted by law. After this period, we will securely delete or anonymize your data.
      </p>
    ),
  },
  {
    title: "9. Policy Updates",
    content: (
      <p>
        Vynox Media reserves the right to update or change this Privacy Policy at any time. Any changes made will be reflected on this page, and we encourage you to review it periodically to stay informed about how we collect, use, and protect your data.
      </p>
    ),
  },
  {
    title: "10. Contact Us",
    content: (
      <>
        <p>If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at:</p>
        <p className="mt-2">
          Email: <a href="mailto:hello@vynoxmedia.com" className="text-primary hover:underline">hello@vynoxmedia.com</a>
        </p>
      </>
    ),
  },
];

const termsOfServiceSections: LegalSection[] = [
  {
    title: "1. Introduction",
    content: (
      <>
        <p>
          Vynox Media is a premier agency specializing in influencer marketing, talent management, and digital campaign execution. We connect brands with creators to design and implement effective marketing strategies. These Terms outline the processes and expectations for working with Vynox Media, ensuring a clear understanding of the rights and responsibilities of all parties involved.
        </p>
        <p className="mt-4">
          While the services listed in this document reflect our current offerings, Vynox Media reserves the right to add or remove services as the business evolves. Any changes to our service offerings will be communicated accordingly.
        </p>
      </>
    ),
  },
  {
    title: "2. Agreement to Terms",
    content: (
      <p>
        By engaging Vynox Media for influencer marketing, talent management, campaign execution, or other services we provide, you agree to these Terms of Service. These Terms form a binding agreement between you (&quot;Brand&quot; or &quot;Creator&quot;) and Vynox Media. If you do not agree to these Terms, you must refrain from using our services.
      </p>
    ),
  },
  {
    title: "3. Services and Scope",
    content: (
      <>
        <p>
          Vynox Media offers services such as influencer marketing, talent management, social media management, and campaign management. While these are our primary offerings, we may introduce or remove services as necessary. Specific terms related to each service will be defined in individual agreements or statements of work.
        </p>
        <p className="mt-4">
          While Vynox Media strives to deliver high-quality campaigns and services, we do not guarantee specific results, such as a predetermined number of views, engagements, or sales from any campaign.
        </p>
      </>
    ),
  },
  {
    title: "4. Responsibilities of Brands",
    content: (
      <div className="space-y-4">
        <p>Brands working with Vynox Media agree to the following terms:</p>
        <div>
          <h4 className="text-white font-semibold text-[14px]">4.1 Campaign Approval</h4>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Brands must provide clear and detailed requirements for campaigns.</li>
            <li>All materials, such as scripts and brand guidelines, must be supplied in a timely manner.</li>
            <li>Brands are responsible for approving influencer selections, campaign designs, and video content within the stipulated timelines. Delays in approval may impact project deadlines.</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[14px]">4.2 Payment Obligations</h4>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Payment must be made in full before final video publication unless otherwise agreed in writing.</li>
            <li>Non-payment or delayed payment may result in cancellation of the campaign or withholding of deliverables.</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[14px]">4.3 Revisions and Edits</h4>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Brands are entitled to request reasonable revisions to demo videos during the approval process.</li>
            <li>Any additional requests outside the agreed-upon scope may result in additional charges.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "5. Responsibilities of Creators",
    content: (
      <div className="space-y-4">
        <p>Creators collaborating with Vynox Media agree to the following terms:</p>
        <div>
          <h4 className="text-white font-semibold text-[14px]">5.1 Content Requirements</h4>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Creators must produce content that adheres to the brand&apos;s provided script, guidelines, and overall campaign objectives.</li>
            <li>Content must comply with legal standards, including copyright laws, advertising regulations, and platform policies.</li>
            <li>Creators are responsible for ensuring the quality and authenticity of the content they produce.</li>
            <li>Creators are responsible for complying with any additional terms or conditions set forth by Vynox Media.</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[14px]">5.2 Submission and Deadlines</h4>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Creators must submit demo videos and final content by the deadlines agreed upon with Vynox Media.</li>
            <li>Failure to meet deadlines may result in penalties or cancellation of the partnership.</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[14px]">5.3 Payment Terms</h4>
          <p className="mt-2 text-sm">
            Creators will receive payment after the brand approves the final video. Payments will be processed within the agreed timeline after approval.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[14px]">5.4 Professional Conduct</h4>
          <p className="mt-2 text-sm">
            Creators must maintain professionalism throughout the campaign and refrain from engaging in activities that may harm the brand&apos;s or Vynox Media&apos;s reputation.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "6. Intellectual Property",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Any use of Vynox Media&apos;s name, branding, or materials requires prior written consent.</li>
        <li>Brands retain ownership of their trademarks, logos, and any materials provided for the campaign.</li>
        <li>Creators retain ownership of their content unless otherwise agreed. Brands are granted a non-exclusive license to use the content for promotional purposes.</li>
      </ul>
    ),
  },
  {
    title: "7. Confidentiality",
    content: (
      <>
        <p>All parties agree to maintain confidentiality regarding proprietary information shared during the collaboration. This includes, but is not limited to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Campaign strategies</li>
          <li>Pricing structures</li>
          <li>Scripts and creative materials</li>
        </ul>
        <p className="mt-4">Confidentiality obligations continue after the conclusion of the campaign unless otherwise stated.</p>
      </>
    ),
  },
  {
    title: "8. Termination",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-white font-semibold text-[14px]">8.1 By Vynox Media</h4>
          <p className="mt-2 text-sm">We reserve the right to terminate any collaboration if:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>A party breaches the Terms of Service.</li>
            <li>Payment is not received as agreed.</li>
            <li>The campaign is deemed detrimental to Vynox Media&apos;s reputation or operations.</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[14px]">8.2 By Brands or Creators</h4>
          <p className="mt-2 text-sm">
            Brands or creators may terminate their agreement by providing written notice. Any costs incurred up to the point of termination must be paid in full.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "9. Limitation of Liability",
    content: (
      <>
        <p>Vynox Media is not liable for any indirect, incidental, or consequential damages arising from the use of our services. This includes, but is not limited to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Loss of revenue, profit, or business opportunities.</li>
          <li>Issues arising from platform or audience behavior outside of our control.</li>
        </ul>
        <p className="mt-4">Our total liability will not exceed the amount paid for the services in question.</p>
      </>
    ),
  },
  {
    title: "10. Dispute Resolution",
    content: (
      <p>
        In the event of a dispute, all parties agree to attempt resolution through good-faith negotiation. If resolution cannot be achieved, disputes will be subject to arbitration in India.
      </p>
    ),
  },
  {
    title: "11. Governing Law",
    content: (
      <p>
        These Terms are governed by and construed in accordance with the laws of India. Any disputes or legal proceedings shall be subject to the jurisdiction of the courts in India.
      </p>
    ),
  },
  {
    title: "12. Miscellaneous",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-white font-semibold text-[14px]">12.1 Force Majeure</h4>
          <p className="mt-2 text-sm">
            Vynox Media is not responsible for delays or failures caused by events beyond our reasonable control, such as natural disasters, acts of government, or technical failures.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[14px]">12.2 Entire Agreement</h4>
          <p className="mt-2 text-sm">
            These Terms, along with any written agreements or statements of work, constitute the entire agreement between the parties and supersede all prior agreements.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[14px]">12.3 Severability</h4>
          <p className="mt-2 text-sm">
            If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in effect.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "13. Disclaimer",
    content: (
      <>
        <p>
          Vynox Media provides the services on an &quot;as is&quot; and &quot;as available&quot; basis. We make no representations or warranties of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the services will be uninterrupted, secure, or error-free, or that the results of using the services will meet your requirements.
        </p>
        <p className="mt-4">
          In no event shall Vynox Media be liable for any direct, indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, sales, or data, whether based on contract, tort (including negligence), or any other theory of liability, arising out of or in connection with the use of or inability to use the services, even if Vynox Media has been advised of the possibility of such damages.
        </p>
      </>
    ),
  },
  {
    title: "14. Changes to Terms and Services",
    content: (
      <p>
        Vynox Media reserves the right to update or modify these Terms at any time. Changes will be posted on our website, and continued use of our services after changes are made constitutes acceptance of the revised Terms. Similarly, we may add, modify, or discontinue services as business needs evolve.
      </p>
    ),
  },
  {
    title: "15. Contact Us",
    content: (
      <>
        <p>For any inquiries or concerns regarding these Terms, please contact Vynox Media at:</p>
        <p className="mt-2">
          Email: <a href="mailto:hello@vynoxmedia.com" className="text-primary hover:underline">hello@vynoxmedia.com</a>
        </p>
      </>
    ),
  },
];

export const privacyPolicyContent: LegalPageContent = {
  icon: Shield,
  title: "Privacy",
  accent: "Policy",
  lastUpdated: "Last updated: December 22, 2024",
  intro: (
    <>
      At Vynox Media, we are committed to protecting your privacy. This Privacy Policy outlines the types of information we collect, how we use and protect that information, and your rights concerning your personal data. By using our services, you agree to the practices described in this Privacy Policy.
    </>
  ),
  sections: privacyPolicySections,
};

export const termsOfServiceContent: LegalPageContent = {
  icon: ScrollText,
  title: "Terms of",
  accent: "Service",
  lastUpdated: "Last updated: December 22, 2024",
  intro: (
    <>
      Welcome to Vynox Media! These Terms of Service (&quot;Terms&quot;) govern your relationship with us as a Brand or Creator, outlining the rules, processes, and expectations for working with our agency. By accessing or using our services, you agree to comply with these Terms. Please read them carefully.
    </>
  ),
  sections: termsOfServiceSections,
};
