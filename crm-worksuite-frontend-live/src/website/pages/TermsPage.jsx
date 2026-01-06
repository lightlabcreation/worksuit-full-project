import { motion } from 'framer-motion'
import Card from '../../components/ui/Card'
import premiumBg from '../../assets/premium_bg.png'

const TermsPage = () => {
  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* Premium Animated Background Layer */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [-20, 20, -20],
          y: [-10, 10, -10],
          rotate: [0, 1, 0]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat w-full h-full transform-gpu"
        style={{
          backgroundImage: `url(${premiumBg})`,
          filter: 'brightness(0.55)'
        }}
      />
      {/* Dynamic Overlay Layer */}
      <div className="fixed inset-0 z-0 bg-gradient-to-tr from-slate-950/90 via-slate-950/50 to-primary-accent/10 backdrop-blur-[1px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-20 md:pt-20 pb-8 sm:pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
              Terms & Conditions
            </h1>
            <p className="text-base sm:text-lg text-slate-400 px-4">Last updated: December 20, 2024</p>
          </motion.div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl sm:rounded-[3rem] p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="space-y-6 sm:space-y-8 text-slate-300">
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    1. Acceptance of Terms
                  </h2>
                  <p className="leading-relaxed text-base sm:text-lg">
                    By accessing or using Develo CRM ("Service"), you agree to be bound by these Terms and
                    Conditions ("Terms"). If you disagree with any part of these terms, you may not access the Service.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    2. Description of Service
                  </h2>
                  <p className="leading-relaxed text-base sm:text-lg">
                    Develo CRM is a customer relationship management platform that provides project management,
                    client management, invoicing, HR management, and related business tools. The Service is provided
                    "as is" and "as available" without warranties of any kind.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    3. User Accounts
                  </h2>
                  <ul className="list-none space-y-3 ml-4">
                    {[
                      'You must be at least 18 years old to use this Service',
                      'You are responsible for maintaining the security of your account and password',
                      'You must provide accurate and complete registration information',
                      'You are responsible for all activities that occur under your account',
                      'You must notify us immediately of any unauthorized use of your account'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base sm:text-lg">
                        <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-accent/10 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-primary-accent" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    4. Acceptable Use
                  </h2>
                  <p className="leading-relaxed mb-4 text-base sm:text-lg">You agree not to use the Service to:</p>
                  <ul className="list-none space-y-3 ml-4">
                    {[
                      'Violate any applicable laws or regulations',
                      'Infringe upon the rights of others',
                      'Upload or transmit viruses or malicious code',
                      'Attempt to gain unauthorized access to our systems',
                      'Engage in any activity that interferes with the Service',
                      'Use the Service for any illegal or unauthorized purpose'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base sm:text-lg">
                        <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-accent/10 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-primary-accent" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    5. Subscription and Payment
                  </h2>
                  <ul className="list-none space-y-3 ml-4">
                    {[
                      'Some features of the Service require a paid subscription',
                      'Subscription fees are billed in advance on a monthly or annual basis',
                      'All fees are non-refundable unless otherwise stated',
                      'We reserve the right to change our pricing with 30 days notice',
                      'Failure to pay may result in suspension or termination of your account'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base sm:text-lg">
                        <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-accent/10 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-primary-accent" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    6. Intellectual Property
                  </h2>
                  <p className="leading-relaxed text-base sm:text-lg">
                    The Service and its original content, features, and functionality are owned by Develo CRM
                    and are protected by international copyright, trademark, patent, trade secret, and other
                    intellectual property laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    7. User Content
                  </h2>
                  <ul className="list-none space-y-3 ml-4">
                    {[
                      'You retain ownership of content you upload to the Service',
                      'You grant us a license to use, store, and display your content to provide the Service',
                      'You are responsible for the legality and appropriateness of your content',
                      'We may remove content that violates these Terms'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base sm:text-lg">
                        <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-accent/10 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-primary-accent" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    8. Data Protection
                  </h2>
                  <p className="leading-relaxed text-base sm:text-lg">
                    We take data protection seriously. Our use of your personal information is governed by our
                    Privacy Policy, which is incorporated into these Terms by reference.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    9. Limitation of Liability
                  </h2>
                  <p className="leading-relaxed text-base sm:text-lg">
                    In no event shall Develo CRM, its directors, employees, partners, agents, suppliers, or
                    affiliates be liable for any indirect, incidental, special, consequential, or punitive damages,
                    including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    10. Disclaimer
                  </h2>
                  <p className="leading-relaxed text-base sm:text-lg">
                    The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties,
                    expressed or implied, regarding the operation of the Service or the information, content,
                    materials, or products included on the Service.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    11. Termination
                  </h2>
                  <p className="leading-relaxed text-base sm:text-lg">
                    We may terminate or suspend your account and access to the Service immediately, without
                    prior notice, for conduct that we believe violates these Terms or is harmful to other
                    users of the Service, us, or third parties, or for any other reason.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    12. Governing Law
                  </h2>
                  <p className="leading-relaxed text-base sm:text-lg">
                    These Terms shall be governed by and construed in accordance with the laws of the State of
                    New York, United States, without regard to its conflict of law provisions.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    13. Changes to Terms
                  </h2>
                  <p className="leading-relaxed text-base sm:text-lg">
                    We reserve the right to modify or replace these Terms at any time. We will provide notice
                    of any changes by posting the new Terms on this page. Your continued use of the Service
                    after any such changes constitutes your acceptance of the new Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    14. Contact Us
                  </h2>
                  <p className="leading-relaxed mb-4 text-base sm:text-lg">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="mt-4 p-4 sm:p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <p className="text-base sm:text-lg mb-2"><strong className="text-primary-accent">Email:</strong> <span className="text-slate-300">legal@Develo.com</span></p>
                    <p className="text-base sm:text-lg"><strong className="text-primary-accent">Address:</strong> <span className="text-slate-300">123 Business Street, Suite 100, New York, NY 10001</span></p>
                  </div>
                </section>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Bottom Fade */}
        <div className="h-28 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

export default TermsPage