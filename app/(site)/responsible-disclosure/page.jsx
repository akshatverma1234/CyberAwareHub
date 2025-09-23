import React from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  Award,
  Upload,
  Mail,
  Clock,
} from "lucide-react";
import { Button } from "@mui/material";

const ResponsibleDisclosure = () => {
  const ScopeItem = ({ title, items, type }) => (
    <div
      className={`bg-gray-800/50 rounded-xl p-6 border-l-4 ${
        type === "in" ? "border-green-500" : "border-red-500"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        {type === "in" ? (
          <CheckCircle className="text-green-500" size={24} />
        ) : (
          <XCircle className="text-red-500" size={24} />
        )}
        <h3
          className={`text-xl font-semibold ${
            type === "in" ? "text-green-400" : "text-red-400"
          }`}
        >
          {title}
        </h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-300 flex items-start gap-2">
            <span
              className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                type === "in" ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="bg-[#06080e] w-full min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent"></div>
        <div className="relative flex items-center justify-center w-full h-[400px] px-4 mt-16">
          <div className="flex flex-col items-center justify-center gap-6 text-center max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-blue-400" size={48} />
              <h1 className="text-4xl md:text-6xl text-white font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Responsible Disclosure
              </h1>
            </div>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl leading-relaxed">
              Help us secure Cyber Awareness Hub. We welcome security
              researchers to responsibly report vulnerabilities and contribute
              to our platform's security.
            </p>
            <Button className="!text-gray-800 !rounded-[20px] !bg-white  !shadow-md !w-[35%] h-[45px] !text-[18px] !normal-case">
              Report vulnerability
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Security Research Program
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              We believe in collaborative security and encourage responsible
              disclosure of security vulnerabilities. This program is designed
              to create a safe environment for security researchers to help
              improve our platform's security.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-blue-400" size={32} />
                <h3 className="text-xl font-semibold text-white">
                  Our Commitment
                </h3>
              </div>
              <p className="text-gray-300">
                We are committed to working with security researchers to
                identify and resolve security issues promptly and responsibly.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-yellow-400" size={32} />
                <h3 className="text-xl font-semibold text-white">
                  Recognition
                </h3>
              </div>
              <p className="text-gray-300">
                Valid security reports will be acknowledged, and with your
                permission, you'll be credited in our Hall of Fame.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-green-400" size={32} />
                <h3 className="text-xl font-semibold text-white">
                  Quick Response
                </h3>
              </div>
              <p className="text-gray-300">
                We aim to acknowledge reports within 48 hours and provide
                regular updates on our progress.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              When to Report Issues
            </h2>
            <p className="text-gray-300 text-lg">
              Clear guidelines on what's in scope and out of scope for our
              security research program.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <ScopeItem
              title="In-Scope"
              type="in"
              items={[
                "Authentication vulnerabilities (login, signup, password reset, Clerk integration)",
                "Role-based access control issues (Admin, Moderator, Member workflows)",
                "Admin Dashboard vulnerabilities (user/content management)",
                "API endpoint misconfigurations, bypasses, and rate limiting issues",
                "Community submission features (articles, case studies, stories)",
                "Email notification system vulnerabilities",
                "AI Summarization issues (prompt injection, sensitive data leaks)",
                "Cross-site scripting (XSS) and injection vulnerabilities",
                "Cross-site request forgery (CSRF) attacks",
                "Privilege escalation vulnerabilities",
                "Data exposure and information disclosure",
                "Business logic flaws",
              ]}
            />

            <ScopeItem
              title="Out-of-Scope"
              type="out"
              items={[
                "DoS/DDoS attacks (volumetric attacks, resource exhaustion)",
                "Automated scanner reports without proof-of-concept",
                "Social engineering or phishing attempts against users/staff",
                "Issues on third-party services (Clerk, Vercel, MongoDB, Redis, etc.)",
                "UI/UX bugs with no security impact",
                "Spam or irrelevant vulnerability submissions",
                "Vulnerabilities in non-production environments",
                "Physical attacks against our infrastructure",
                "Reports from automated tools without validation",
                "Issues that require physical access to devices",
                "Vulnerabilities in outdated browser versions",
                "Self-XSS requiring user interaction",
              ]}
            />
          </div>

          <div className="bg-amber-900/20 border border-amber-600 rounded-xl p-6 mt-8">
            <div className="flex items-start gap-3">
              <AlertTriangle
                className="text-amber-400 flex-shrink-0 mt-1"
                size={20}
              />
              <div>
                <h3 className="text-amber-400 font-semibold mb-2">
                  Important Guidelines
                </h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Do not access, modify, or delete user data</li>
                  <li>• Avoid disrupting our services or other users</li>
                  <li>• Report findings privately before public disclosure</li>
                  <li>• One vulnerability per report for faster processing</li>
                  <li>• Test only against your own accounts when possible</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Guidelines for Submissions
            </h2>
            <p className="text-gray-300 text-lg">
              Follow these guidelines to ensure your security reports are
              processed efficiently.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center gap-3 mb-4">
                <FileText class="text-blue-400" size="24"></FileText>
                <h3 class="text-xl font-semibold text-white">
                  Report Requirements
                </h3>
              </div>
              <ul class="text-gray-300 space-y-4">
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <div>
                    <strong class="block text-white mb-1">
                      Clear Description:
                    </strong>
                    <p>Provide a detailed explanation of the vulnerability.</p>
                  </div>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <div>
                    <strong class="block text-white mb-1">
                      Affected URLs:
                    </strong>
                    <p>List specific pages or endpoints affected.</p>
                  </div>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <div>
                    <strong class="block text-white mb-1">
                      Reproduction Steps:
                    </strong>
                    <p>Step-by-step instructions to reproduce the issue.</p>
                  </div>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <div>
                    <strong class="block text-white mb-1">
                      Impact Assessment:
                    </strong>
                    <p>Explain the potential security impact.</p>
                  </div>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <div>
                    <strong className="block text-white mb-1">
                      Browser/Environment:
                    </strong>
                    <p>
                      Include technical details about your testing environment.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Upload className="text-green-400" size="24"></Upload>
                <h3 className="text-xl font-semibold text-white">
                  Proof of Concept Guidelines
                </h3>
              </div>
              <div className="text-gray-300 space-y-4">
                <p>For evidence and proof of concept materials:</p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="block text-white mb-1">
                        Upload to Google Drive:
                      </strong>
                      <p>
                        Create a folder with all evidence (screenshots, videos,
                        code snippets).
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="block text-white mb-1">
                        Share Settings:
                      </strong>
                      <p>
                        Set sharing permissions to "Anyone with the link can
                        view."
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="block text-white mb-1">
                        Submit Link:
                      </strong>
                      <p>
                        Include the Google Drive link in your vulnerability
                        report.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="block text-white mb-1">
                        File Organization:
                      </strong>
                      <p>
                        Name files clearly (e.g.,
                        "XSS_admin_panel_screenshot.png").
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button className="!text-gray-800 !rounded-[20px] !bg-white !shadow-md !w-[25%] h-[45px] !text-[18px] !normal-case">
              Report vulnerability
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              <Award className="inline mr-3" size={36} />
              Security Researchers Hall of Fame
            </h2>
            <p className="text-gray-300 text-lg">
              We recognize and thank the security researchers who help make
              Cyber Awareness Hub safer.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 text-center">
            <div className="mb-6">
              <Shield className="text-blue-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-white mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-300">
                As this is a learning project, we will acknowledge and list
                security researchers whose reports are validated and approved.
                Your contributions will be recognized here with your permission.
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-600">
              <h4 className="text-lg font-medium text-white mb-3">
                Recognition Criteria
              </h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>
                  • Submit a valid, previously unknown security vulnerability
                </li>
                <li>• Follow responsible disclosure guidelines</li>
                <li>• Provide sufficient detail for reproduction and fixing</li>
                <li>• Give permission to be listed in our Hall of Fame</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center bg-gray-900/50 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm">
            <strong className="text-white">Note:</strong> This responsible
            disclosure program is part of a cybersecurity learning project. We
            are committed to handling all reports professionally and improving
            our security posture through community collaboration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResponsibleDisclosure;
