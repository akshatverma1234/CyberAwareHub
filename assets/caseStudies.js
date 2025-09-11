export const caseStudies = [
  {
    id: 1,
    title: "WannaCry Ransomware Attack – 2017",
    image:
      "https://securitybrief.com.au/uploads/story/2017/05/22/ThinkstockPhotos-684061756.webp",
    category: "Ransomware",
    date: "May 12, 2017",
    summary:
      "A global ransomware attack that infected over 200,000 computers in 150 countries within days.",
    impact:
      "Hospitals, businesses, and governments faced downtime and billions in damages.",
    lesson: "Keep systems updated and apply security patches regularly.",
    detailedContent: {
      background:
        "WannaCry was a ransomware cryptoworm that exploited a vulnerability in Microsoft Windows' Server Message Block (SMB) protocol. The vulnerability, known as EternalBlue, was originally discovered by the US National Security Agency (NSA) but was later leaked by the Shadow Brokers hacking group.",
      timeline: [
        {
          date: "April 2017",
          event:
            "Shadow Brokers leaked NSA hacking tools including EternalBlue",
        },
        {
          date: "May 12, 2017",
          event: "WannaCry attack began spreading globally at 7:44 UTC",
        },
        {
          date: "May 13, 2017",
          event:
            "Kill switch discovered by security researcher Marcus Hutchins",
        },
        {
          date: "May 15, 2017",
          event: "Attack largely contained but variants continued to spread",
        },
      ],
      technicalDetails: {
        exploitUsed: "EternalBlue (CVE-2017-0144) - SMB vulnerability",
        propagationMethod: "Network worm spreading through SMB ports",
        encryption: "RSA-2048 and AES-128 encryption algorithms",
        ransom: "$300 in Bitcoin, doubling to $600 after 3 days",
      },
      majorVictims: [
        {
          organization: "UK's National Health Service (NHS)",
          impact:
            "16 health trusts affected, 19,000 medical appointments cancelled",
        },
        {
          organization: "Telefónica (Spain)",
          impact: "Thousands of computers infected, operations disrupted",
        },
        {
          organization: "FedEx",
          impact: "TNT Express division severely affected for weeks",
        },
        {
          organization: "Deutsche Bahn (Germany)",
          impact: "Train station displays and ticketing systems affected",
        },
        {
          organization: "Renault (France)",
          impact: "Production lines halted at multiple factories",
        },
      ],
      statistics: {
        countriesAffected: 150,
        computersInfected: "200,000+",
        financialLoss: "$4 billion globally",
        recoveryTime: "Several weeks to months",
        patchAvailable: "2 months before attack (March 2017)",
      },
      preventionMeasures: [
        "Install MS17-010 security patch immediately",
        "Keep Windows operating systems updated",
        "Disable SMBv1 protocol on all systems",
        "Implement network segmentation",
        "Regular security backups",
        "Employee cybersecurity training",
        "Deploy endpoint detection and response (EDR) solutions",
      ],
      longTermImpact:
        "WannaCry highlighted the critical importance of patch management and led to increased cybersecurity awareness globally. It also raised questions about the ethics of government agencies stockpiling zero-day exploits.",
    },
  },
  {
    id: 2,
    title: "Twitter Bitcoin Scam – 2020",
    image: "https://i.insider.com/5f1076c43f737071843642a8?width=700",
    category: "Social Engineering",
    date: "July 15, 2020",
    summary:
      "Hackers gained access to Twitter's admin tools and hijacked high-profile accounts to run Bitcoin scams.",
    impact:
      "Scammers earned $120,000 worth of Bitcoin in hours and exposed Twitter's security weaknesses.",
    lesson:
      "Use multi-factor authentication and monitor admin access strictly.",
    detailedContent: {
      background:
        "The Twitter hack was a coordinated social engineering attack that targeted Twitter employees with access to internal tools. The attackers used these tools to take over 130 high-profile accounts and post Bitcoin scam messages.",
      timeline: [
        {
          date: "July 15, 2020 - 3:00 PM EST",
          event:
            "First compromised accounts (Elon Musk, Bill Gates) post Bitcoin scam",
        },
        {
          date: "July 15, 2020 - 4:00 PM EST",
          event: "More accounts compromised (Obama, Biden, Apple, Uber)",
        },
        {
          date: "July 15, 2020 - 6:00 PM EST",
          event: "Twitter disables ability to tweet for all verified accounts",
        },
        {
          date: "July 16, 2020",
          event: "Twitter gradually restores functionality",
        },
      ],
      technicalDetails: {
        attackMethod: "Social engineering via phone spear phishing",
        targetedEmployees: "Twitter employees with admin panel access",
        accountsCompromised: 130,
        accountsWithTweets: 45,
        dataAccessed:
          "Direct messages for 36 accounts, Twitter data for 8 accounts",
      },
      compromisedAccounts: [
        {
          name: "Elon Musk",
          followers: "36M+",
          impact: "First major account compromised",
        },
        {
          name: "Bill Gates",
          followers: "53M+",
          impact: "Massive reach for scam message",
        },
        {
          name: "Barack Obama",
          followers: "106M+",
          impact: "Highest follower count affected",
        },
        {
          name: "Joe Biden",
          followers: "20M+",
          impact: "Political figure credibility exploited",
        },
        {
          name: "Apple",
          followers: "4.4M+",
          impact: "Corporate account compromised",
        },
        {
          name: "Uber",
          followers: "1.1M+",
          impact: "Transportation company affected",
        },
        {
          name: "Kanye West",
          followers: "30M+",
          impact: "Celebrity endorsement exploited",
        },
        {
          name: "Mike Bloomberg",
          followers: "2.9M+",
          impact: "Political/business figure targeted",
        },
      ],
      scamDetails: {
        message:
          "Feeling grateful, doubling all Bitcoin payments sent to my address! Send $1000, get $2000 back!",
        bitcoinAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        totalReceived: "$121,000 (12.86 Bitcoin)",
        transactions: 400,
        averageAmount: "$300 per transaction",
      },
      arrests: [
        {
          name: "Graham Ivan Clark",
          age: 17,
          role: "Mastermind",
          charges: "30 felony charges including fraud and hacking",
        },
        {
          name: "Mason Sheppard",
          age: 19,
          role: "Co-conspirator",
          charges: "Federal charges for aiding the attack",
        },
        {
          name: "Nima Fazeli",
          age: 22,
          role: "Co-conspirator",
          charges: "Federal charges for money laundering",
        },
      ],
      twitterResponse: [
        "Immediate suspension of tweeting for all verified accounts",
        "Password resets for all affected accounts",
        "Review of internal systems and employee access",
        "Cooperation with law enforcement",
        "Implementation of additional security measures",
      ],
      preventionMeasures: [
        "Enhanced employee security training",
        "Stricter access controls for admin tools",
        "Multi-factor authentication requirements",
        "Regular security audits of internal systems",
        "Improved monitoring of suspicious activities",
        "Background checks for employees with sensitive access",
      ],
      longTermImpact:
        "The incident led to increased scrutiny of social media platforms' security practices and highlighted the risks of social engineering attacks on employees with privileged access.",
    },
  },
  {
    id: 3,
    title: "Equifax Data Breach – 2017",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?fm=jpg&q=60&w=3000",
    category: "Data Breach",
    date: "July 29, 2017",
    summary:
      "One of the largest data breaches in history, exposing personal information of 147 million Americans.",
    impact:
      "Social Security numbers, birth dates, addresses, and credit card numbers were stolen.",
    lesson:
      "Regular security updates and vulnerability assessments are critical for protecting sensitive data.",
    detailedContent: {
      background:
        "Equifax, one of the three major credit reporting agencies in the US, suffered a massive data breach due to an unpatched vulnerability in the Apache Struts web application framework. The breach went undetected for 76 days.",
      timeline: [
        {
          date: "March 7, 2017",
          event: "Apache Struts vulnerability CVE-2017-5638 disclosed",
        },
        {
          date: "March 8, 2017",
          event: "Equifax received security bulletin about the vulnerability",
        },
        {
          date: "May 13, 2017",
          event: "Hackers first gained access to Equifax systems",
        },
        {
          date: "July 29, 2017",
          event: "Breach discovered during routine security scan",
        },
        {
          date: "September 7, 2017",
          event: "Equifax publicly disclosed the breach",
        },
      ],
      technicalDetails: {
        vulnerability: "CVE-2017-5638 in Apache Struts 2",
        exploitType: "Remote code execution via malformed Content-Type header",
        systemsAffected: "Online dispute portal for consumers",
        durationUndetected: "76 days",
        patchDelay: "2 months after vulnerability disclosure",
      },
      dataCompromised: {
        personalInfo: {
          names: "147 million",
          socialSecurityNumbers: "147 million",
          birthDates: "147 million",
          addresses: "147 million",
          driverLicenses: "209,000",
        },
        financialInfo: {
          creditCardNumbers: "209,000",
          disputeDocuments: "182,000",
          taxpayerIDs: "Unknown number",
        },
        internationalImpact: {
          canadians: "19,000 credit cards and personal info",
          ukResidents: "15.2 million records",
        },
      },
      securityFailures: [
        "Failed to patch known vulnerability for 2+ months",
        "Expired security certificates went unnoticed",
        "Inadequate network segmentation",
        "Insufficient monitoring and alerting",
        "Delayed breach detection (76 days)",
        "Poor incident response procedures",
      ],
      consequences: {
        financial: [
          "$575 million settlement with FTC, CFPB, and states",
          "$690 million total cost including legal fees",
          "Stock price dropped 35% initially",
          "Credit monitoring services for affected individuals",
        ],
        legal: [
          "Multiple class-action lawsuits",
          "Congressional hearings",
          "SEC investigation",
          "Criminal charges for executives who sold stock",
        ],
        operational: [
          "CEO Rick Smith resigned",
          "Chief Security Officer and CIO retired",
          "Major overhaul of security practices",
          "Increased regulatory scrutiny",
        ],
      },
      affectedIndividuals: {
        identityTheft: "Millions at risk for identity theft",
        creditMonitoring: "Free credit monitoring offered to all US consumers",
        fraudulentAccounts: "Spike in fraudulent credit applications",
        longTermImpact: "Ongoing monitoring needed for decades",
      },
      preventionMeasures: [
        "Implement automated patch management systems",
        "Regular vulnerability scanning and penetration testing",
        "Network segmentation to limit breach impact",
        "Real-time monitoring and alerting systems",
        "Employee security awareness training",
        "Incident response plan testing",
        "Zero-trust security architecture",
      ],
      regulatoryChanges: [
        "Enhanced data breach notification requirements",
        "Stricter cybersecurity standards for credit agencies",
        "Increased penalties for data protection failures",
        "New consumer rights regarding personal data",
      ],
      longTermImpact:
        "The Equifax breach fundamentally changed how organizations approach cybersecurity, leading to stricter regulations, higher penalties, and greater emphasis on proactive security measures.",
    },
  },
  {
    id: 4,
    title: "SolarWinds Supply Chain Attack – 2020",
    image:
      "https://evalian.co.uk/wp-content/uploads/2023/08/SolarWinds-supply-chain-attack-continues-to-cast-a-shadow-across-Tech-industry-1.png",
    category: "Supply Chain Attack",
    date: "December 13, 2020",
    summary:
      "Russian state-sponsored hackers compromised SolarWinds' Orion software, affecting 18,000+ organizations.",
    impact:
      "US government agencies and Fortune 500 companies were infiltrated for months.",
    lesson:
      "Supply chain security is critical; verify the integrity of all third-party software and updates.",
    detailedContent: {
      background:
        "The SolarWinds attack was a sophisticated supply chain compromise attributed to the Russian SVR (Foreign Intelligence Service). Hackers inserted malware called SUNBURST into SolarWinds' Orion software updates, which were then distributed to customers worldwide.",
      timeline: [
        {
          date: "March 2020",
          event:
            "Hackers first gain access to SolarWinds development environment",
        },
        {
          date: "March-June 2020",
          event: "SUNBURST malware inserted into Orion software builds",
        },
        {
          date: "June 2020",
          event: "Compromised Orion updates distributed to customers",
        },
        {
          date: "December 8, 2020",
          event: "FireEye discovers they were breached via SolarWinds",
        },
        {
          date: "December 13, 2020",
          event: "SolarWinds attack publicly disclosed",
        },
      ],
      technicalDetails: {
        malware: "SUNBURST (also known as Solorigate)",
        targetSoftware: "SolarWinds Orion Platform versions 2019.4-2020.2.1",
        distributionMethod: "Trojanized software updates",
        persistence: "DLL side-loading and legitimate software processes",
        attribution: "APT29 (Cozy Bear) - Russian SVR",
      },
      attackMethodology: {
        initialAccess: "Compromise of SolarWinds build environment",
        persistence: "Malicious code in legitimate software updates",
        lateralMovement: "TEARDROP malware and custom tools",
        dataExfiltration: "Stealthy communication via legitimate domains",
        scopeExpansion: "From SolarWinds to customer environments",
      },
      majorVictims: [
        {
          organization: "US Treasury Department",
          impact: "Email communications compromised",
        },
        {
          organization: "US Department of Homeland Security",
          impact: "Internal systems accessed",
        },
        {
          organization: "US Department of State",
          impact: "Diplomatic communications at risk",
        },
        {
          organization: "US Department of Energy",
          impact: "Nuclear weapons agency affected",
        },
        {
          organization: "FireEye",
          impact: "Cybersecurity company's tools stolen",
        },
        {
          organization: "Microsoft",
          impact: "Source code repositories accessed",
        },
        {
          organization: "Cisco",
          impact: "Internal systems compromised",
        },
        {
          organization: "VMware",
          impact: "Corporate infrastructure affected",
        },
      ],
      statistics: {
        organizationsInstalled: "18,000+ installed trojanized updates",
        organizationsCompromised: "~100 organizations actually breached",
        durationInNetwork: "9+ months undetected",
        countriesAffected: "Multiple countries including US, UK, Canada",
        malwareSize: "32KB DLL file",
      },
      governmentResponse: [
        "Executive Order on cybersecurity (EO 14028)",
        "Creation of Cyber Safety Review Board",
        "Enhanced federal cybersecurity requirements",
        "Sanctions against Russian individuals and entities",
        "CISA emergency directive 21-01",
      ],
      industryImpact: {
        trustIssues: "Customers questioned third-party software security",
        securityChanges:
          "Enhanced supply chain security measures industry-wide",
        detection: "Improved monitoring for supply chain compromises",
        collaboration: "Increased public-private cybersecurity cooperation",
      },
      preventionMeasures: [
        "Code signing verification and integrity checks",
        "Build environment security hardening",
        "Software Bill of Materials (SBOM) implementation",
        "Zero-trust architecture adoption",
        "Enhanced vendor risk assessment",
        "Continuous security monitoring",
        "Network segmentation and micro-segmentation",
      ],
      detectionChallenges: [
        "Malware dormancy period (12-14 days)",
        "Use of legitimate domains for C2 communication",
        "Minimal network footprint",
        "Legitimate software process abuse",
        "Advanced evasion techniques",
      ],
      longTermImpact:
        "The SolarWinds attack fundamentally changed how organizations approach supply chain security, leading to new regulations, enhanced verification processes, and greater scrutiny of third-party software.",
    },
  },
  {
    id: 5,
    title: "Colonial Pipeline Ransomware – 2021",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?fm=jpg&q=60&w=3000",
    category: "Critical Infrastructure",
    date: "May 7, 2021",
    summary:
      "DarkSide ransomware shut down the largest fuel pipeline system in the US for six days.",
    impact:
      "Fuel shortages across the Southeast US, panic buying, and $4.4 million ransom payment.",
    lesson:
      "Critical infrastructure requires robust cybersecurity and incident response plans.",
    detailedContent: {
      background:
        "Colonial Pipeline operates the largest refined products pipeline system in the US, transporting 2.5 million barrels daily. The DarkSide ransomware group attacked their IT systems, forcing a complete shutdown as a precautionary measure.",
      timeline: [
        {
          date: "May 7, 2021 - Early morning",
          event: "DarkSide ransomware encrypts Colonial Pipeline systems",
        },
        {
          date: "May 7, 2021 - 6:10 PM",
          event: "Colonial Pipeline shuts down entire pipeline system",
        },
        {
          date: "May 8, 2021",
          event: "Colonial pays $4.4 million ransom in Bitcoin",
        },
        {
          date: "May 12, 2021",
          event: "Pipeline operations begin gradual restart",
        },
        {
          date: "May 15, 2021",
          event: "Normal operations fully restored",
        },
      ],
      technicalDetails: {
        ransomware: "DarkSide - Ransomware-as-a-Service (RaaS)",
        initialAccess: "Compromised VPN account (no MFA)",
        targetSystems: "IT systems, not operational technology (OT)",
        encryptionScope: "Billing systems, email, and administrative functions",
        ransomAmount: "$4.4 million in Bitcoin",
      },
      pipelineImpact: {
        length: "5,500 miles from Texas to New York",
        capacity: "2.5 million barrels per day (45% of East Coast supply)",
        shutdownDuration: "6 days complete shutdown",
        affectedStates: "17 states from Texas to New Jersey",
        fuelTypes: "Gasoline, diesel, jet fuel, heating oil",
      },
      economicConsequences: {
        gasoline: [
          "Average gas price increased by 6 cents nationally",
          "Some areas saw increases of 15-20 cents per gallon",
          "10,000+ gas stations ran out of fuel",
          "Panic buying led to 87% of stations in Washington DC without fuel",
        ],
        aviation: [
          "American Airlines rerouted flights from affected airports",
          "Delta and Southwest adjusted schedules",
          "Jet fuel shortages at major airports",
        ],
        supply: [
          "17% of US fuel supply affected",
          "Strategic petroleum reserve considered",
          "Alternative transportation methods activated",
        ],
      },
      ransomPayment: {
        amount: "$4.4 million (75 Bitcoin)",
        currency: "Bitcoin to untraceable wallet",
        decision: "CEO decided to pay for faster recovery",
        recovery: "FBI recovered $2.3 million (63.7 Bitcoin)",
        controversy: "Debate over paying ransoms to criminal groups",
      },
      darksideGroup: {
        model: "Ransomware-as-a-Service (RaaS)",
        affiliates: "Multiple criminal groups using their software",
        targets: "Large corporations, avoiding hospitals and schools",
        revenue: "30% kept by DarkSide, 70% to affiliates",
        shutdown: "Group disbanded after Colonial Pipeline attention",
      },
      governmentResponse: [
        "Presidential briefing and national emergency consideration",
        "DOT issued emergency declaration for fuel transport",
        "FBI investigation and Bitcoin recovery",
        "Enhanced pipeline cybersecurity regulations",
        "Executive Order on cybersecurity for critical infrastructure",
      ],
      securityFailures: [
        "Legacy VPN without multi-factor authentication",
        "Insufficient network segmentation between IT and OT",
        "Inadequate incident response procedures",
        "Limited backup and recovery capabilities",
        "Poor employee cybersecurity training",
      ],
      preventionMeasures: [
        "Implement multi-factor authentication on all remote access",
        "Network segmentation between IT and OT systems",
        "Regular security assessments and penetration testing",
        "Employee cybersecurity awareness training",
        "Robust backup and disaster recovery procedures",
        "Incident response plan testing and updates",
        "Zero-trust network architecture",
      ],
      regulatoryChanges: [
        "TSA Security Directive for pipeline operators",
        "Mandatory cybersecurity incident reporting",
        "Enhanced cybersecurity requirements for critical infrastructure",
        "Coordination between federal agencies and private sector",
      ],
      longTermImpact:
        "The Colonial Pipeline attack highlighted the vulnerability of critical infrastructure to cyberattacks and led to significant investments in operational technology security and public-private cybersecurity partnerships.",
    },
  },
  {
    id: 6,
    title: "Target Data Breach – 2013",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?fm=jpg&q=60&w=3000",
    category: "Retail Breach",
    date: "November 27, 2013",
    summary:
      "Hackers stole credit and debit card information from 40 million Target customers during the holiday shopping season.",
    impact:
      "110 million customer records compromised, $292 million in costs, and lasting damage to Target's reputation.",
    lesson:
      "Point-of-sale systems need robust security, and third-party vendor access must be strictly controlled.",
    detailedContent: {
      background:
        "Target's data breach began with a phishing attack on Fazio Mechanical Services, a small HVAC contractor. Hackers used these credentials to access Target's network and install point-of-sale malware across stores nationwide.",
      timeline: [
        {
          date: "November 15, 2013",
          event: "Malware installed on Target's point-of-sale systems",
        },
        {
          date: "November 27, 2013",
          event: "Black Friday - peak data collection begins",
        },
        {
          date: "December 12, 2013",
          event:
            "US Department of Justice contacts Target about suspicious activity",
        },
        {
          date: "December 15, 2013",
          event: "Target confirms malware and begins investigation",
        },
        {
          date: "December 19, 2013",
          event: "Target publicly discloses the breach",
        },
      ],
      technicalDetails: {
        initialVector: "Phishing attack on Fazio Mechanical Services",
        networkAccess: "Vendor credentials used to access Target's network",
        malware: "Point-of-sale RAM scraping malware",
        dataExfiltration: "FTP server in Russia used for stolen data",
        scopePeriod: "November 27 - December 15, 2013",
      },
      attackMethodology: {
        phase1: "Phishing attack on HVAC vendor (Fazio Mechanical)",
        phase2: "Lateral movement within Target's network",
        phase3: "Installation of POS malware on cash registers",
        phase4: "Real-time data scraping from payment cards",
        phase5: "Exfiltration to external command and control servers",
      },
      dataCompromised: {
        paymentCards: {
          creditDebit: "40 million payment card accounts",
          dataStolen: "Card numbers, expiration dates, CVV codes",
          timePeriod: "November 27 - December 15, 2013",
        },
        personalInfo: {
          customers: "70 million additional customers",
          dataTypes: "Names, addresses, phone numbers, email addresses",
          totalAffected: "110 million unique individuals",
        },
      },
      securityFailures: [
        "Insufficient vendor access controls",
        "Weak network segmentation between corporate and POS networks",
        "Inadequate monitoring of third-party access",
        "Failure to detect malware for weeks",
        "Poor incident response coordination",
        "Insufficient encryption of sensitive data",
      ],
      financialImpact: {
        immediateCosts: [
          "$61 million in breach-related expenses (2013)",
          "$17 million in additional costs (2014)",
          "$162 million total breach costs",
        ],
        legal: [
          "$10 million settlement with customers",
          "$39 million settlement with banks and credit unions",
          "$18.5 million settlement with 47 states",
        ],
        businessImpact: [
          "4.5% decrease in transactions during holiday season",
          "46% drop in profits (Q4 2013)",
          "$148 million in credit card industry settlements",
        ],
      },
      customerImpact: {
        immediate: [
          "40 million potentially compromised payment cards",
          "Mass reissuance of credit and debit cards",
          "Fraudulent transactions reported nationwide",
          "Customer trust significantly damaged",
        ],
        longTerm: [
          "Free credit monitoring offered to all customers",
          "Enhanced customer notification systems",
          "Ongoing monitoring for fraudulent activity",
          "Changes in shopping behavior and brand perception",
        ],
      },
      industryResponse: {
        retailers: [
          "Enhanced POS security across retail industry",
          "Improved vendor management practices",
          "Accelerated EMV (chip card) adoption",
          "Investment in cybersecurity technologies",
        ],
        paymentIndustry: [
          "Faster chip card deployment timeline",
          "Enhanced fraud monitoring systems",
          "Improved real-time transaction monitoring",
          "Stricter PCI DSS compliance enforcement",
        ],
      },
      preventionMeasures: [
        "Implement strong vendor access controls and monitoring",
        "Network segmentation between corporate and POS systems",
        "Regular security assessments of third-party vendors",
        "Point-to-point encryption (P2PE) for payment data",
        "Real-time monitoring and anomaly detection",
        "Employee cybersecurity awareness training",
        "Incident response plan testing and improvement",
      ],
      regulatoryChanges: [
        "Enhanced data breach notification laws in multiple states",
        "Stricter PCI DSS requirements for retailers",
        "Increased penalties for data protection failures",
        "Enhanced consumer protection regulations",
      ],
      longTermImpact:
        "The Target breach accelerated the adoption of EMV chip technology in the US, led to enhanced vendor security requirements across the retail industry, and established new standards for breach notification and customer protection.",
    },
  },
];
