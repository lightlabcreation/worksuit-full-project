import { motion } from 'framer-motion'
import Card from '../../components/ui/Card'
import premiumBg from '../../assets/premium_bg.png'

const PrivacyPolicyPage = () => {
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
        <section className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-20 sm:pt-20 md:pt-20 pb-8 sm:pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
              Privacy Policy
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
                    1. Introduction
                  </h2>
                  <p className="leading-relaxed text-base sm:text-lg">
                    Develo CRM ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                    explains how we collect, use, disclose, and safeguard your information when you use our
                    customer relationship management platform and related services.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    2. Information We Collect
                  </h2>
                  <p className="leading-relaxed mb-4 text-base sm:text-lg">We collect information you provide directly to us, including:</p>
                  <ul className="list-none space-y-3 ml-4">
                    {[
                      'Account information (name, email address, password, company name)',
                      'Profile information (job title, phone number, profile photo)',
                      'Payment information (credit card details, billing address)',
                      'Content you create (projects, tasks, documents, messages)',
                      'Communications with us (support requests, feedback)'
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
                    3. How We Use Your Information
                  </h2>
                  <p className="leading-relaxed mb-4 text-base sm:text-lg">We use the information we collect to:</p>
                  <ul className="list-none space-y-3 ml-4">
                    {[
                      'Provide, maintain, and improve our services',
                      'Process transactions and send related information',
                      'Send you technical notices, updates, and support messages',
                      'Respond to your comments, questions, and requests',
                      'Monitor and analyze trends, usage, and activities',
                      'Detect, investigate, and prevent fraudulent transactions'
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
                    4. Information Sharing
                  </h2>
                  <p className="leading-relaxed mb-4 text-base sm:text-lg">
                    We do not sell, trade, or otherwise transfer your personal information to third parties.
                    We may share your information only in the following circumstances:
                  </p>
                  <ul className="list-none space-y-3 ml-4">
                    {[
                      'With your consent or at your direction',
                      'With service providers who assist in our operations',
                      'To comply with legal obligations',
                      'To protect our rights and prevent fraud'
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
                    5. Data Security
                  </h2>
                  <p className="leading-relaxed text-base sm:text-lg">
                    We implement appropriate technical and organizational measures to protect your personal
                    information against unauthorized access, alteration, disclosure, or destruction. This includes
                    encryption, secure servers, and regular security assessments.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    6. Data Retention
                  </h2>
                  <p className="leading-relaxed text-base sm:text-lg">
                    We retain your personal information for as long as your account is active or as needed to
                    provide you services. We will also retain and use your information to comply with our legal
                    obligations, resolve disputes, and enforce our agreements.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    7. Your Rights
                  </h2>
                  <p className="leading-relaxed mb-4 text-base sm:text-lg">You have the right to:</p>
                  <ul className="list-none space-y-3 ml-4">
                    {[
                      'Access your personal information',
                      'Correct inaccurate or incomplete data',
                      'Request deletion of your data',
                      'Object to processing of your data',
                      'Request data portability',
                      'Withdraw consent at any time'
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
                    8. Cookies and Tracking
                  </h2>
                  <p className="leading-relaxed text-base sm:text-lg">
                    We use cookies and similar tracking technologies to track activity on our service and
                    hold certain information. You can instruct your browser to refuse all cookies or to
                    indicate when a cookie is being sent.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    9. Children's Privacy
                  </h2>
                  <p className="leading-relaxed text-base sm:text-lg">
                    Our services are not intended for children under 13 years of age. We do not knowingly
                    collect personal information from children under 13.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    10. Changes to This Policy
                  </h2>
                  <p className="leading-relaxed text-base sm:text-lg">
                    We may update this Privacy Policy from time to time. We will notify you of any changes
                    by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary-accent rounded-full shadow-[0_0_10px_rgba(33,126,69,0.8)]" />
                    11. Contact Us
                  </h2>
                  <p className="leading-relaxed mb-4 text-base sm:text-lg">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="mt-4 p-4 sm:p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <p className="text-base sm:text-lg mb-2"><strong className="text-primary-accent">Email:</strong> <span className="text-slate-300">privacy@Develo.com</span></p>
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

export default PrivacyPolicyPage