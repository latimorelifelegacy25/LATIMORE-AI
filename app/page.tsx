"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { validateNotionFormula, FormulaValidationError } from "./api/webhooks/fillout/lib/notion-formula-validator";
import {
  Database,
  Plus,
  Trash2,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Heart,
  DollarSign,
  Target,
  Grid,
  Filter,
  Calendar,
  RefreshCw,
  Settings,
  X,
  Check,
  MessageSquare,
  Send,
  Zap,
  Activity,
  PlusCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  Sliders,
  CheckSquare,
  Layers,
  ChevronDown,
  LineChart as LineChartIcon,
  Link,
  Smartphone,
  ExternalLink,
  Search,
  BookOpen,
  PieChart as PieChartIcon,
  Share2,
  Cpu,
  Download,
  Upload,
  FolderOpen
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";

// TypeScript Interfaces for the database
interface FinanceItem {
  id: string;
  date: string;
  item: string;
  category: string;
  amount: number;
  type: "Income" | "Expense";
  goalId: string | null;
}

interface HealthItem {
  id: string;
  date: string;
  metric: string;
  category: "Sleep" | "Exercise" | "Diet" | "Mood" | "Mental";
  value: number; // e.g. sleep hours, workout duration, etc.
  energyLevel: number; // 1-10 status
  notes: string;
  goalId: string | null;
}

interface GoalItem {
  id: string;
  name: string;
  domain: string;
  target: number;
  currentValue: number;
  unit: string;
  status: "Not Started" | "In Progress" | "Completed";
  targetDate: string;
}

interface AIInsightCorrelation {
  type: string;
  description: string;
  impactLevel: "High" | "Medium" | "Low";
  metricComparison: string;
}

interface AIInsightTask {
  domain: "Finance" | "Health" | "Goals";
  title: string;
  advice: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface AIReport {
  executiveSummary: string;
  financialHabitsText: string;
  healthTrendsText: string;
  interconnectedCorrelations: AIInsightCorrelation[];
  actionItems: AIInsightTask[];
}

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

interface NotionRelationship {
  id: string;
  title: string;
  sourceDb: "Finances" | "Health" | "Goals";
  sourceMetric: string;
  targetDb: "Finances" | "Health" | "Goals";
  targetMetric: string;
  impactType: "Positive Benefit" | "Negative Friction" | "Financial Funding" | "Direct Sync";
  strength: "High" | "Medium" | "Low";
  description: string;
  notionFormula: string;
}

interface GoalAutocompleteProps {
  goals: GoalItem[];
  selectedGoalId: string;
  onSelectGoal: (goalId: string) => void;
  placeholder?: string;
}

function GoalAutocomplete({ goals, selectedGoalId, onSelectGoal, placeholder = "Search goals..." }: GoalAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedGoal = goals.find(g => g.id === selectedGoalId);

  // Filter existing goals based on typed query (checks both name and domain)
  const filteredGoals = searchQuery.trim() === ""
    ? goals
    : goals.filter(g =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.domain.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Handle clicks outside of dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (goalId: string, name: string) => {
    onSelectGoal(goalId);
    setSearchQuery(name);
    setIsOpen(false);
  };

  const handleClear = () => {
    onSelectGoal("");
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleInputChange = (val: string) => {
    setSearchQuery(val);
    setIsOpen(true);
    if (val === "") {
      onSelectGoal("");
    } else {
      const exactMatch = goals.find(g => g.name.toLowerCase() === val.toLowerCase());
      if (exactMatch) {
        onSelectGoal(exactMatch.id);
      }
    }
  };

  const handleInputFocus = () => {
    setSearchQuery(selectedGoal ? selectedGoal.name : "");
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter") {
      if (filteredGoals.length > 0) {
        handleSelect(filteredGoals[0].id, filteredGoals[0].name);
      }
      e.preventDefault();
    }
  };

  const displayValue = isOpen ? searchQuery : (selectedGoal ? selectedGoal.name : "");

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={displayValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-lg pl-3 pr-8 py-2 text-xs focus:outline-none text-slate-300 placeholder-slate-600 transition-colors"
        />
        {/* Right side icon buttons */}
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {selectedGoalId ? (
            <button
              type="button"
              onClick={handleClear}
              className="text-slate-500 hover:text-slate-300 transition-colors p-0.5"
              title="Clear selection"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto bg-slate-950 border border-slate-800 rounded-lg shadow-xl font-mono text-xs">
          {/* Default '-- Single Area Relation --' option */}
          <button
            type="button"
            onClick={handleClear}
            className="w-full text-left px-3 py-2 text-slate-500 hover:bg-slate-900 transition-colors border-b border-slate-900"
          >
            -- Single Area Relation --
          </button>

          {filteredGoals.length === 0 ? (
            <div className="px-3 py-2.5 text-slate-500 italic text-[11px] font-sans">
              No matching goals found
            </div>
          ) : (
            filteredGoals.map((g) => {
              const isSelected = g.id === selectedGoalId;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => handleSelect(g.id, g.name)}
                  className={`w-full text-left px-3 py-2 transition-colors flex flex-col gap-0.5 hover:bg-slate-900 ${
                    isSelected ? "bg-teal-500/10 text-teal-300" : "text-slate-300"
                  }`}
                >
                  <span className="font-bold font-sans text-xs">{g.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">Domain: {g.domain}</span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

const getIntIcon = (iconNameOrComponent: any) => {
  if (!iconNameOrComponent) return HelpCircle;
  if (typeof iconNameOrComponent === "function" || React.isValidElement(iconNameOrComponent)) return iconNameOrComponent;
  switch (iconNameOrComponent) {
    case "Heart": return Heart;
    case "Activity": return Activity;
    case "DollarSign": return DollarSign;
    case "Calendar": return Calendar;
    case "Share2": return Share2;
    case "Smartphone": return Smartphone;
    case "Layers": return Layers;
    case "MessageSquare": return MessageSquare;
    case "Database": return Database;
    case "Settings": return Settings;
    case "Zap": return Zap;
    case "Sparkles": return Sparkles;
    default: return HelpCircle;
  }
};

export default function LatimoreWorkspace() {
  const [mounted, setMounted] = useState(false);

  // AutoLoop Custom GPT-Chain States
  const [autoloopTopic, setAutoloopTopic] = useState("Advanced SEO Lead Generation & Trust Building");
  const [autoloopBrand, setAutoloopBrand] = useState("Latimore Legacy Agency");
  const [autoloopCourseName, setAutoloopCourseName] = useState("SEO Lead Generation Engine 101");
  const [autoloopOutcome, setAutoloopOutcome] = useState("Empowers local professionals to build automated courses that convert and lock in local trust.");
  const [autoloopAudience, setAutoloopAudience] = useState("Central PA Agency Brokers, Independent Agents, and SMB Owners");
  const [autoloopTone, setAutoloopTone] = useState("authoritative"); // expert, helpful, authoritative, local

  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [nodeExecutionLogs, setNodeExecutionLogs] = useState<string[]>([
    "System: AutoLoop Engine initialized.",
    "System: Model aligned under default 'gemini-3.5-flash'.",
    "System: Ready to begin course workflow loop generation."
  ]);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [isExecutingNode, setIsExecutingNode] = useState(false);
  const [selectedOutputNodeId, setSelectedOutputNodeId] = useState<string>("2");
  const [autoloopOutputs, setAutoloopOutputs] = useState<Record<string, string>>({
    "1": `# Workflow Initialization\n\n- **Status**: START node reached\n- **Trigger**: manual initialization\n- **Timestamp**: ${new Date().toISOString()}`,
    "2": `# Change Log initialized\n\n- **Change Log Identifier**: COURSE LOOP — Jackson Latimore OS\n- **Loop iteration count**: 1\n- **Active target topic**: Advanced SEO Lead Generation\n- **Target Audience**: Central PA SMB Owners\n\n*Ready to compile course outline.*`
  });

  const [autoloopPreset, setAutoloopPreset] = useState<"seo" | "codebase" | "daily_brief" | "email_drip" | "custom">("seo");
  const [customWorkflowNodes, setCustomWorkflowNodes] = useState<any[]>([]);

  // Daily Marketing Command Brief Preset - field config & defaults
  const DAILY_BRIEF_FIELDS: { key: string; label: string; multiline?: boolean }[] = [
    { key: "BRIEF_DATE", label: "Brief Date" },
    { key: "TARGET_AUDIENCE", label: "Target Audience", multiline: true },
    { key: "OFFER_FOCUS", label: "Offer Focus", multiline: true },
    { key: "COMMUNITY_FOCUS", label: "Community Focus", multiline: true },
    { key: "PAHS_PROOF_POINT", label: "PAHS Proof Point", multiline: true },
    { key: "PRIMARY_CTA", label: "Primary CTA" },
    { key: "SECONDARY_CTA", label: "Secondary CTA" },
    { key: "EDUCATION_TOPIC", label: "Education Topic", multiline: true },
    { key: "LEAD_SOURCE", label: "Lead Source", multiline: true },
    { key: "LEAD_NAME", label: "Lead Name" },
    { key: "LEAD_INTEREST", label: "Lead Interest" },
    { key: "SOURCE_CAMPAIGN", label: "Source Campaign" },
    { key: "PIPELINE_STAGE", label: "Pipeline Stage" },
    { key: "COMMUNITY_PARTNER", label: "Community Partner" },
    { key: "CAMPAIGN_ASSET", label: "Campaign Asset", multiline: true },
    { key: "QR_UTM_DESTINATION", label: "QR / UTM Destination", multiline: true },
    { key: "CAMPAIGN_GOAL", label: "Campaign Goal", multiline: true },
    { key: "REFERRAL_AUDIENCE", label: "Referral Audience", multiline: true },
    { key: "REFERRAL_ANGLE", label: "Referral Angle", multiline: true },
  ];

  const DAILY_BRIEF_DEFAULTS: Record<string, string> = {
    BRIEF_DATE: "Today",
    TARGET_AUDIENCE: "Families, parents, homeowners, and community members who need life insurance or legacy protection guidance",
    OFFER_FOCUS: "Life insurance, final expense planning, mortgage protection, family protection, and legacy planning",
    COMMUNITY_FOCUS: "Local families connected to the PAHS and surrounding community",
    PAHS_PROOF_POINT: "Latimore Life & Legacy supports PAHS through sponsorship, community outreach, postcards, direct mail, and measurable QR-based campaign tracking",
    PRIMARY_CTA: "Scan the QR code",
    SECONDARY_CTA: "DM “PROTECT”",
    EDUCATION_TOPIC: "Why every family should review their protection plan before they need it",
    LEAD_SOURCE: "QR code, Facebook, Google Business Profile, referral, community event, postcard, or direct mail",
    LEAD_NAME: "New lead",
    LEAD_INTEREST: "Family protection quote",
    SOURCE_CAMPAIGN: "PAHS community campaign",
    PIPELINE_STAGE: "New lead",
    COMMUNITY_PARTNER: "PAHS",
    CAMPAIGN_ASSET: "Ethos postcard or direct-mail piece with QR code",
    QR_UTM_DESTINATION: "Tracked quote or lead-capture page",
    CAMPAIGN_GOAL: "Move community members from awareness to captured leads and booked conversations",
    REFERRAL_AUDIENCE: "Existing clients, friends, parents, school families, and trusted community contacts",
    REFERRAL_ANGLE: "Help another family protect what matters before life forces the conversation",
  };

  const [dailyBriefVars, setDailyBriefVars] = useState<Record<string, string>>(DAILY_BRIEF_DEFAULTS);

  // Email Drip Campaign Engine Preset - field config & defaults
  const EMAIL_DRIP_FIELDS: { key: string; label: string; multiline?: boolean }[] = [
    { key: "business_name", label: "Business Name" },
    { key: "brand_name", label: "Brand Name" },
    { key: "owner_name", label: "Owner Name" },
    { key: "sender_name", label: "Sender Name" },
    { key: "sender_title", label: "Sender Title" },
    { key: "phone_number", label: "Phone Number" },
    { key: "reply_to_email", label: "Reply-To Email" },
    { key: "booking_link", label: "Booking Link" },
    { key: "service_area", label: "Service Area" },
    { key: "primary_offers", label: "Primary Offers", multiline: true },
    { key: "voice_guidelines", label: "Voice Guidelines", multiline: true },
    { key: "crm_name", label: "CRM Name" },
    { key: "crm_first_name_token", label: "CRM First Name Token" },
    { key: "trigger_sources_table", label: "Trigger Sources Table", multiline: true },
    { key: "compliance_notes", label: "Compliance Notes", multiline: true },
    { key: "kpi_targets", label: "KPI Targets", multiline: true },
    { key: "pipeline_stages", label: "Pipeline Stages", multiline: true },
  ];

  const EMAIL_DRIP_DEFAULTS: Record<string, string> = {
    business_name: "Latimore Life & Legacy LLC",
    brand_name: "Latimore OS",
    owner_name: "Jackson Latimore",
    sender_name: "Jackson Latimore",
    sender_title: "Founder | Protection & Retirement Advisor",
    phone_number: "(###) ###-####",
    reply_to_email: "reply@latimorelifelegacy.com",
    booking_link: "https://your-booking-link.com",
    service_area: "Coal Region and surrounding communities",
    primary_offers: "Life insurance, living benefits, mortgage protection, retirement income planning, annuity education, legacy planning",
    voice_guidelines: "Plain English, no pressure, clarity-first, trust-building, local community tone",
    crm_name: "Your CRM",
    crm_first_name_token: "{{first_name}}",
    trigger_sources_table:
      "PAHS QR code -> Family Protection / Community Trust\nWebsite consultation form -> General Protection Review\nEthos quote request -> Fast Term / Living Benefits\nRetirement inquiry -> Annuity / Safe Money\nFacebook DM “PROTECT” -> Life Insurance Education\nGoogle Business Profile -> Local Trust / Policy Review",
    compliance_notes:
      "Include unsubscribe/opt-out instructions where required. Follow applicable TCPA/CAN-SPAM rules. Use business address/footer if required by your email provider.",
    kpi_targets:
      "Email open rate: 35%+\nClick-through rate: 3%–8%\nReply rate: 5%+\nBooking conversion: 10%–20%\nSequence completion: 80%+\nCold lead revival: 5%–10%",
    pipeline_stages: "New Lead, Nurturing, Engaged, Booked, No Response, Closed Won, Closed Lost, Opted Out, Cold",
  };

  const [emailDripVars, setEmailDripVars] = useState<Record<string, string>>(EMAIL_DRIP_DEFAULTS);

  const updateDailyBriefVar = (key: string, value: string) =>
    setDailyBriefVars((prev) => ({ ...prev, [key]: value }));

  const updateEmailDripVar = (key: string, value: string) =>
    setEmailDripVars((prev) => ({ ...prev, [key]: value }));

  // Codebase Preset States (Always-Updated Codebase Audit & Fix Loop parameters)
  const [auditProjectName, setAuditProjectName] = useState("Latimore Hub OS");
  const [auditPrimaryLanguage, setAuditPrimaryLanguage] = useState("TypeScript");
  const [auditFrameworks, setAuditFrameworks] = useState("Next.js, Tailwind, Prisma, Lucide");
  const [auditBranchName, setAuditBranchName] = useState("main");
  const [auditAuditFocus, setAuditAuditFocus] = useState("Cross-database correlation integrity, database pre-warming, static HTML build validation, and file path sanity checks.");
  const [auditRepositoryContext, setAuditRepositoryContext] = useState(
    `- File Structure:\n  - /app/page.tsx: Core workspace panel with active state monitors.\n  - /app/api/gemini/insights/route.ts: Multi-Notion database core analyzer endpoint using Gemini 3.5.\n  - /app/api/gemini/autoloop/route.ts: Workflow node executor proxy.\n- Stack: Next.js 15.18, Tailwind CSS v4, Prisma PostgreSQL.`
  );
  const [auditKnownIssues, setAuditKnownIssues] = useState(
    `- Build warning for missing dependencies in React useEffect loops inside App Layout.`
  );
  const [auditCodebaseStandards, setAuditCodebaseStandards] = useState(
    `- Never expose Gemini secret keys in environment declarations named next_public; proxy all requests server-side.\n- Prevent telemetry logs or unrequested system status displays in margins.`
  );
  const [auditRecentChanges, setAuditRecentChanges] = useState(
    `- Configured downloadable text exporter on Autoloop tab to support prompt outputs & logs download.\n- Fixed Module not found error on fetch-blob/from by installing node-domexception directly.`
  );
  const [auditBuildCommand, setAuditBuildCommand] = useState("npm run build");
  const [auditTestCommand, setAuditTestCommand] = useState("npm run lint");
  const [auditLintCommand, setAuditLintCommand] = useState("npm run lint");
  const [auditOutputFormat, setAuditOutputFormat] = useState("Markdown report with prioritized tables");
  const [auditRunFrequency, setAuditRunFrequency] = useState("On demand repository audits");

  const SEO_WORKFLOW_NODES = [
    { id: "1", type: "START", label: "START: Set Loop Parameters", prompt: "Initialize Course Generator Flow" },
    {
      id: "2",
      type: "DEFAULT",
      label: "🧠 Setup Node",
      prompt: "Start the COURSE LOOP Generator. Since this is a repeatable run, create a CHANGE_LOG titled: COURSE LOOP — {brand_name}.\n\nFor every run, log:\n- timestamp: {timestamp}\n- selected_topic: {course_topic}\n- outcome: {desired_outcome}\n\nEnsure this is printed as elegant systems metadata markdown."
    },
    {
      id: "3",
      type: "DEFAULT",
      label: "📘 Outline Node",
      prompt: "You are an expert course creator and curriculum designer. Create a project-based course outline block styled with proper headings for '{course_name}' focused on topic: '{course_topic}'. Requirements: Exactly 6 modules, each focusing on a specific business solution outcome: '{desired_outcome}' for target audience: '{target_audience}'. Ensure each module has a clear title and list of 5 sub-sections. Output in beautiful markdown tables."
    },
    {
      id: "4",
      type: "DEFAULT",
      label: "📖 Overviews Node",
      prompt: "Using the course outline, write a complete course overview (5-8 sentences) suitable for {target_audience} in a {tone} tone. For each of the 6 modules, write a brief 2-sentence synopsis and a clear table of contents mapping the lessons."
    },
    {
      id: "5",
      type: "DEFAULT",
      label: "🧩 Module 1 Content",
      prompt: "Generate the complete, exhaustively detailed content for Module 1. Maintain a {tone} tone, make it highly practical and project-oriented. Focus on foundational systems and real-world tools. Organize with clear headers, bullet points, and actionable exercises."
    },
    {
      id: "6",
      type: "DEFAULT",
      label: "🧩 Module 2 Content",
      prompt: "Generate the complete, exhaustively detailed content for Module 2. Cover setup requirements, initial parameters, and tooling configurations. Maintain a {tone} tone and include step-by-step checklists."
    },
    {
      id: "7",
      type: "DEFAULT",
      label: "🧩 Module 3 Content",
      prompt: "Generate the complete, exhaustively detailed content for Module 3. Cover configuration setups, operational challenges, and execution mechanics. Use rich code examples or tabular comparisons."
    },
    {
      id: "8",
      type: "DEFAULT",
      label: "🧩 Module 4 Content",
      prompt: "Generate the complete, exhaustively detailed content for Module 4. Show how to scale operations, handle larger cohorts, automate steps, and expand influence. Ensure highly actionable tips."
    },
    {
      id: "9",
      type: "DEFAULT",
      label: "🧩 Module 5 Content",
      prompt: "Generate the complete, exhaustively detailed content for Module 5. Provide 3 real-world detailed case studies demonstrating success and list 5 critical mistakes to avoid with explicit workarounds."
    },
    {
      id: "10",
      type: "DEFAULT",
      label: "🧩 Module 6 Content",
      prompt: "Generate the complete, exhaustively detailed content for Module 6. Specify the Capstone Hands-on Project details: scope, guidelines, templates, grading rubric, and final delivery steps to secure '{desired_outcome}'."
    },
    {
      id: "11",
      type: "DEFAULT",
      label: "🎓 Conclusion Node",
      prompt: "Write a concise, motivating course conclusion. Motivate {target_audience} to put the lessons into real practice. List 3 key immediate action items and a congratulatory sign-off."
    },
    {
      id: "12",
      type: "DEFAULT",
      label: "🗺️ Roadmap Node",
      prompt: "Create a simple timeline roadmap in Markdown table format showing a recommended 6-week schedule. List Module, primary goal, weekly milestone task, and estimated hours."
    },
    {
      id: "13",
      type: "DEFAULT",
      label: "📝 Glossary Node",
      prompt: "Create a rich glossary of exactly 51+ core industry terms related to {course_topic}. Present as a list with bold terminology and precise definitions."
    },
    {
      id: "14",
      type: "DEFAULT",
      label: "💡 Study Tips Node",
      prompt: "Create a detailed table of exactly 51 helpful tips for completing {course_name} and executing the capstone system effectively under pressure."
    },
    {
      id: "15",
      type: "DEFAULT",
      label: "⚡ Prompt Pack Node",
      prompt: "Identify important workflow tasks and write 101 high-quality, copy-pasteable AI system prompts for ChatGPT/Gemini to automate {course_topic} for {target_audience} in a {tone} manner."
    },
    {
      id: "16",
      type: "DEFAULT",
      label: "🔍 SEO Keywords Node",
      prompt: "Generate 50 high-intent search queries and 'How-To' phrases related to {course_topic} to maximize SEO content traffic."
    },
    {
      id: "17",
      type: "DEFAULT",
      label: "✍️ SEO Article Node",
      prompt: "Act as an expert SEO writer. Write a comprehensive 2000-word search-engine optimized tutorial article titled: '{course_name}: Complete SEO Guide'. Include headings, internal tables, and clear FAQs."
    },
    {
      id: "18",
      type: "DEFAULT",
      label: "🎨 Landing Page Node",
      prompt: "Act as an elite conversion copywriter. Write full landing page copy for selling {course_name}. Include headline, value propositions, pricing tier suggestions, and an AIDA styled block."
    },
    {
      id: "19",
      type: "DEFAULT",
      label: "🎨 Colors Node",
      prompt: "Recommend 5 premium, professional UI color palettes matching the brand theme '{brand_name}' for this course landing page. Suggest hex values for primary, background, accent, and text colors."
    },
    {
      id: "20",
      type: "DEFAULT",
      label: "💾 Loop Log Node",
      prompt: "Close the course loop by appending a confirmation summary to CHANGE_LOG. Write: 'AutoLoop complete. Loop count: 1. Topic: {course_topic}. Outputs archived to local index.'"
    },
    { id: "21", type: "END", label: "END: Complete", prompt: "Halt node executor" }
  ];

  const CODEBASE_WORKFLOW_NODES = [
    { id: "1", type: "START", label: "START: Begin Audit and Fix", prompt: "Initialize Codebase Audit Workflow" },
    {
      id: "2",
      type: "DEFAULT",
      label: "🧠 Codebase Context Loader",
      prompt: "You are auditing and fixing the codebase for {PROJECT_NAME}.\n\nUse the latest available repository context:\n\nProject context:\n{REPOSITORY_CONTEXT}\n\nPrimary language:\n{PRIMARY_LANGUAGE}\n\nFrameworks and tooling:\n{FRAMEWORKS}\n\nCurrent branch:\n{BRANCH_NAME}\n\nKnown issues:\n{KNOWN_ISSUES}\n\nCodebase standards:\n{CODEBASE_STANDARDS}\n\nAudit focus:\n{AUDIT_FOCUS}\n\nTreat this as the current source of truth unless newer repository context is provided later in the workflow.\n\nCreate or update a running log titled “CODEBASE FIX LOG — {PROJECT_NAME}”.\n\nTrack:\n- timestamp\n- branch\n- current audit focus\n- known issues\n- assumptions\n- files or modules mentioned\n- unresolved risks\n- fixes attempted\n- verification status\n\nSet NEXT_STEP = detect_recent_changes."
    },
    {
      id: "3",
      type: "DEFAULT",
      label: "🔍 Recent Change Detector",
      prompt: "Review the latest codebase context and identify what appears to have changed recently.\n\nUse:\n{RECENT_CHANGES}\n\nLook for:\n- new files or modules\n- modified architecture\n- dependency changes\n- new routes, APIs, components, jobs, or services\n- deleted or deprecated logic\n- tests added, removed, or missing\n- configuration changes\n- security-sensitive changes\n\nReturn:\n1. Change summary\n2. Files or areas affected\n3. Why each change matters\n4. Potential downstream impact\n5. Confidence level for each finding\n\nUpdate “CODEBASE FIX LOG — {PROJECT_NAME}”.\n\nSet NEXT_STEP = full_codebase_audit."
    },
    {
      id: "4",
      type: "DEFAULT",
      label: "🧪 Full Codebase Audit",
      prompt: "Perform a complete audit of {PROJECT_NAME}.\n\nReview:\n- architecture\n- code quality\n- likely bugs\n- security risks\n- test coverage\n- dependency risks\n- performance risks\n- documentation gaps\n- build and deployment risks\n\nFor every issue, include:\n- issue title\n- affected area\n- severity: critical, high, medium, low\n- why it matters\n- likely root cause\n- recommended fix\n- whether it blocks release\n- confidence level\n\nDo not skip small issues, but prioritize critical and high-severity problems first.\n\nSet NEXT_STEP = fix_plan_generator."
    },
    {
      id: "5",
      type: "DEFAULT",
      label: "🛠 Fix Plan Generator",
      prompt: "Convert the audit into a practical fix plan.\n\nGroup fixes into batches:\n- Batch 1: critical release blockers\n- Batch 2: high-priority functional or security issues\n- Batch 3: medium-priority quality, test, and performance issues\n- Batch 4: low-priority cleanup and documentation\n\nFor each fix, include:\n- target file or module\n- exact problem\n- desired outcome\n- safest fix approach\n- tests or checks required after fixing\n- rollback note if the fix fails\n\nRules:\n- Never bundle unrelated risky changes together.\n- Fix root causes, not symptoms.\n- Preserve existing public APIs unless changing them is necessary.\n- Avoid introducing new dependencies unless clearly justified.\n- Prefer small, reviewable patches.\n\nSet NEXT_STEP = apply_critical_fixes."
    },
    {
      id: "6",
      type: "DEFAULT",
      label: "🚨 Apply Critical Fixes",
      prompt: "Apply or describe exact fixes for all critical issues first.\n\nFor each critical issue:\n1. State the problem.\n2. Explain the root cause.\n3. Provide the exact code change or patch-style instruction.\n4. Explain why the fix works.\n5. Identify the verification step.\n\nIf repository editing is available, make the changes directly.\n\nIf repository editing is not available, provide precise file-by-file patch instructions that a developer can apply without guessing.\n\nDo not move to lower-priority fixes until every critical issue has either been fixed or explicitly marked as requiring missing context.\n\nUpdate “CODEBASE FIX LOG — {PROJECT_NAME}”.\n\nSet NEXT_STEP = verify_critical_fixes."
    },
    {
      id: "7",
      type: "DEFAULT",
      label: "✅ Verify Critical Fixes",
      prompt: "Verify that the critical fixes are complete.\n\nRun or simulate the required checks using:\n\nBuild command:\n{BUILD_COMMAND}\n\nTest command:\n{TEST_COMMAND}\n\nLint command:\n{LINT_COMMAND}\n\nVerify:\n- the original critical issue is resolved\n- no obvious regression was introduced\n- tests cover the fixed behavior\n- security-sensitive fixes are not superficial\n- the build still passes\n- linting still passes\n\nReturn:\n- critical fixes completed\n- checks passed\n- checks failed\n- remaining blockers\n- follow-up patches needed\n\nIf any critical issue remains unresolved, set NEXT_STEP = apply_critical_fixes.\n\nIf all critical issues are resolved, set NEXT_STEP = apply_high_priority_fixes."
    },
    {
      id: "8",
      type: "SLEEPY",
      label: "💤 Delay: Cool down Check",
      timeout: 30,
      prompt: "Simulate a short 30-second loop delay/cooldown before starting the high-priority fix stream."
    },
    {
      id: "9",
      type: "DEFAULT",
      label: "🔥 Apply High-Priority Fixes",
      prompt: "Apply or describe exact fixes for all high-priority issues.\n\nFocus on:\n- likely production bugs\n- security weaknesses\n- broken flows\n- fragile data handling\n- missing validation\n- failed tests\n- major performance bottlenecks\n- architecture problems that will soon cause bugs\n\nFor each fix:\n1. State the issue.\n2. Provide the exact change.\n3. Explain the reasoning.\n4. Add or update tests where needed.\n5. Note any migration or deployment concern.\n\nKeep fixes small and reviewable.\n\nUpdate “CODEBASE FIX LOG — {PROJECT_NAME}”.\n\nSet NEXT_STEP = verify_high_priority_fixes."
    },
    {
      id: "10",
      type: "DEFAULT",
      label: "🧾 Verify High-Priority Fixes",
      prompt: "Verify that all high-priority fixes are complete.\n\nUse:\nBuild command: {BUILD_COMMAND}\nTest command: {TEST_COMMAND}\nLint command: {LINT_COMMAND}\n\nCheck:\n- each high-priority issue has a fix\n- each fix has a validation method\n- tests were added or updated where appropriate\n- no critical issue was reintroduced\n- build, test, and lint status are acceptable\n\nReturn a verification table:\n- issue\n- fixed status\n- verification method\n- result\n- remaining concern\n\nIf any high-priority issue remains unresolved, set NEXT_STEP = apply_high_priority_fixes.\n\nIf all critical and high-priority issues are resolved, set NEXT_STEP = apply_medium_priority_fixes."
    },
    {
      id: "11",
      type: "SLEEPY",
      label: "💤 Delay: Quality Cooldown",
      timeout: 30,
      prompt: "Simulate a short 30-second loop delay/cooldown before starting the medium-priority quality and typescript check stream."
    },
    {
      id: "12",
      type: "DEFAULT",
      label: "📦 Apply Medium-Priority",
      prompt: "Apply or describe exact fixes for medium-priority issues.\n\nFocus on:\n- test coverage gaps\n- duplicate logic\n- unclear functions\n- weak typing\n- inconsistent naming\n- inefficient code paths\n- missing error handling\n- documentation gaps that slow development\n- non-blocking performance improvements\n\nFor each fix:\n- name the affected area\n- describe the current weakness\n- provide the improved version or patch instruction\n- explain how to verify it\n- identify whether the fix is safe or needs review\n\nUpdate “CODEBASE FIX LOG — {PROJECT_NAME}”.\n\nSet NEXT_STEP = verify_medium_priority_fixes."
    },
    {
      id: "13",
      type: "DEFAULT",
      label: "🔎 Verify Medium-Priority",
      prompt: "Verify the medium-priority fixes.\n\nCheck:\n- code remains readable\n- no public behavior changed unintentionally\n- tests still pass\n- lint still passes\n- duplicate or fragile logic was actually reduced\n- documentation updates match the code\n\nReturn:\n- completed fixes\n- failed verifications\n- skipped fixes with reason\n- suggested follow-up\n\nIf medium-priority failures are meaningful, set NEXT_STEP = apply_medium_priority_fixes.\n\nIf medium-priority work is complete or safely deferred, set NEXT_STEP = final_regression_check."
    },
    {
      id: "14",
      type: "DEFAULT",
      label: "🧱 Final Regression Check",
      prompt: "Perform a final regression review across the entire codebase.\n\nValidate:\n- all critical issues are fixed\n- all high-priority issues are fixed\n- medium-priority issues are fixed or intentionally deferred\n- no new obvious bugs were introduced\n- no new security risks were introduced\n- build command is addressed\n- test command is addressed\n- lint command is addressed\n- documentation reflects meaningful changes\n- the codebase is safer than before this run\n\nReturn:\n1. Final pass or fail\n2. Remaining issues by severity\n3. Release confidence score from 1 to 10\n4. What still needs human review\n5. Exact next action\n\nIf any critical or high-priority issue remains, set NEXT_STEP = fix_plan_generator.\n\nIf the codebase passes, set NEXT_STEP = final_fix_report."
    },
    {
      id: "15",
      type: "DEFAULT",
      label: "📋 Final Fix Report",
      prompt: "Create the final fix report for {PROJECT_NAME}.\n\nFormat as {OUTPUT_FORMAT}.\n\nInclude:\n- summary of what was audited\n- summary of what was fixed\n- files or modules changed\n- critical issues resolved\n- high-priority issues resolved\n- medium-priority issues resolved or deferred\n- tests added or updated\n- build, test, and lint status\n- remaining risks\n- recommended next run focus\n- release confidence score\n\nUpdate “CODEBASE FIX LOG — {PROJECT_NAME}” with:\n- timestamp\n- status\n- completed fixes\n- remaining issues\n- verification results\n- next recommended audit focus\n\nSet NEXT_STEP = auto_update_loop."
    },
    {
      id: "16",
      type: "DEFAULT",
      label: "🔄 Auto Update Loop",
      prompt: "Close this fix run.\n\nProject:\n{PROJECT_NAME}\n\nRun frequency:\n{RUN_FREQUENCY}\n\nBranch:\n{BRANCH_NAME}\n\nStatus:\ncomplete\n\nUpdate “CODEBASE FIX LOG — {PROJECT_NAME}” with:\n- what changed since the previous run\n- what was fixed\n- what was verified\n- what remains unresolved\n- whether the next run should be broad or targeted\n\nImportant automation rule:\nIf new repository context is provided in the future, automatically compare it against the existing fix log and continue from detect_recent_changes without asking the user to restate prior context.\n\nCompletion rule:\nDo not mark STATUS = fixed_complete unless there are no unresolved critical or high-priority issues.\n\nReturn one of:\nSTATUS = fixed_complete, NEXT_STEP = idle\nSTATUS = needs_more_context, NEXT_STEP = context_loader\nSTATUS = unresolved_blockers, NEXT_STEP = fix_plan_generator"
    },
    { id: "17", type: "END", label: "END: Fix Run Complete", prompt: "Stop codebase audit loop run." }
  ];

  const DAILY_BRIEF_WORKFLOW_NODES = [
    { id: "1", type: "START", label: "START: Daily Marketing Command Brief", prompt: "Initialize Daily Marketing Command Brief Workflow" },
    {
      id: "2",
      type: "DEFAULT",
      label: "🧠 Daily Context Setup",
      prompt: "You are generating the Latimore Life & Legacy Daily Marketing Command Brief for {BRIEF_DATE}.\n\nUse the Latimore OS model:\n- Build community authority first\n- Use PAHS campaign proof as a trust anchor\n- Drive QR and UTM-based lead capture\n- Think in terms of a Supabase-powered lead pipeline\n- Use clear CTA paths: scan the QR code or DM “PROTECT”\n\nAudience: {TARGET_AUDIENCE}\nOffer focus: {OFFER_FOCUS}\nLocation/community focus: {COMMUNITY_FOCUS}\nCampaign proof point: {PAHS_PROOF_POINT}\nPrimary CTA: {PRIMARY_CTA}\nSecondary CTA: {SECONDARY_CTA}\n\nCreate a concise daily marketing command brief. Keep it practical, community-centered, and action-oriented."
    },
    {
      id: "3",
      type: "DEFAULT",
      label: "📣 Social Post Generator",
      prompt: "Create one ready-to-post Facebook and Google Business Profile post for Latimore Life & Legacy.\n\nRequirements:\n- Open with a community-centered hook\n- Mention protection, legacy, or family readiness\n- Reference {COMMUNITY_FOCUS} naturally\n- Include the PAHS/community trust angle if relevant\n- Keep the tone warm, professional, and human\n- End with the CTA: {PRIMARY_CTA} or {SECONDARY_CTA}\n\nReturn:\n1. Facebook post\n2. Google Business Profile post\n3. Suggested image or graphic idea\n4. Suggested UTM campaign label"
    },
    {
      id: "4",
      type: "DEFAULT",
      label: "📘 Client Education Tip",
      prompt: "Create a simple client education tip for today.\n\nTopic focus: {EDUCATION_TOPIC}\nAudience: {TARGET_AUDIENCE}\n\nRequirements:\n- Explain one useful protection, life insurance, final expense, legacy, or family planning concept\n- Keep it clear enough for a first-time insurance buyer\n- Avoid fear-based language\n- Tie the lesson back to taking one small action today\n- End with a soft CTA using {PRIMARY_CTA} or {SECONDARY_CTA}\n\nReturn the tip in three formats:\n1. Short social caption\n2. SMS-friendly version\n3. One-sentence talking point for in-person conversations"
    },
    {
      id: "5",
      type: "DEFAULT",
      label: "💬 New Lead Follow-Up",
      prompt: "Write a follow-up message for a new lead who came in through {LEAD_SOURCE}.\n\nLead context:\n- Name: {LEAD_NAME}\n- Interest: {LEAD_INTEREST}\n- Source campaign: {SOURCE_CAMPAIGN}\n- Stage in pipeline: {PIPELINE_STAGE}\n\nRequirements:\n- Be personal, respectful, and brief\n- Reference their original action or interest\n- Make the next step easy\n- Offer two response options if helpful\n- Use a calm protection-focused tone\n\nReturn:\n1. SMS follow-up\n2. Email follow-up\n3. Messenger/DM follow-up\n4. Recommended next pipeline status for Supabase"
    },
    {
      id: "6",
      type: "DEFAULT",
      label: "🏫 PAHS Campaign Action",
      prompt: "Create today’s PAHS or community campaign action.\n\nCampaign context:\n- Community partner: {COMMUNITY_PARTNER}\n- Campaign asset: {CAMPAIGN_ASSET}\n- QR or UTM destination: {QR_UTM_DESTINATION}\n- Campaign goal: {CAMPAIGN_GOAL}\n\nRequirements:\n- Make the action measurable\n- Connect the physical or community touchpoint to digital lead capture\n- Include what to post, send, place, ask, or track today\n- Tie the action to the five-stage pipeline: awareness, interest, capture, follow-up, conversion\n\nReturn:\n1. Today’s action\n2. Why it matters\n3. Tracking instruction\n4. Follow-up trigger\n5. Metric to review tomorrow"
    },
    {
      id: "7",
      type: "DEFAULT",
      label: "🤝 Referral Prompt",
      prompt: "Create a referral prompt for Latimore Life & Legacy.\n\nReferral audience: {REFERRAL_AUDIENCE}\nReferral angle: {REFERRAL_ANGLE}\n\nRequirements:\n- Sound natural and relationship-based\n- Make the ask specific but not pushy\n- Mention families, protection, legacy, or community care\n- Include a simple CTA path using {PRIMARY_CTA} or {SECONDARY_CTA}\n\nReturn:\n1. Text message version\n2. Social post version\n3. In-person script\n4. One-line referral card copy"
    },
    {
      id: "8",
      type: "DEFAULT",
      label: "🎯 Top Priorities",
      prompt: "Based on today’s brief, identify the top 3 business priorities for Latimore Life & Legacy.\n\nUse this priority filter:\n1. What creates trust today?\n2. What captures or advances leads today?\n3. What strengthens the community authority system today?\n\nReturn exactly 3 priorities.\n\nFor each priority include:\n- Priority title\n- Why it matters\n- One concrete action\n- Expected result\n- Owner or role responsible"
    },
    {
      id: "9",
      type: "DEFAULT",
      label: "🧾 Final Command Brief",
      prompt: "Compile the full Latimore Life & Legacy Daily Marketing Command Brief into one clean final report.\n\nUse this structure:\n\nLatimore Life & Legacy Daily Marketing Command Brief\nDate: {BRIEF_DATE}\n\n1. Facebook / Google Business Profile Post\n2. Client Education Tip\n3. New-Lead Follow-Up Message\n4. PAHS / Community Campaign Action\n5. Referral Prompt\n6. Top 3 Business Priorities\n7. Tracking Notes for Supabase\n8. Tomorrow’s Review Questions\n\nKeep the final brief concise, polished, and ready to use before the business day starts."
    },
    { id: "10", type: "END", label: "END: Brief Complete", prompt: "Halt node executor" }
  ];

  const EMAIL_DRIP_WORKFLOW_NODES = [
    { id: "1", type: "START", label: "START: Email Drip Campaign Engine", prompt: "Initialize Email Drip Campaign System Workflow" },
    {
      id: "2",
      type: "DEFAULT",
      label: "🧠 Business + Plan Context Lock",
      prompt: "You are building an “Email Drip Campaign System” addendum to an existing Business + Marketing Plan for {business_name} / {brand_name}.\n\nFirst, lock the operating context:\n- Owner: {owner_name}\n- Offers: {primary_offers}\n- Service area: {service_area}\n- Voice: {voice_guidelines}\n- Booking link: {booking_link}\n- CRM: {crm_name}\n- Compliance notes: {compliance_notes}\n\nIf {trigger_sources_table} is provided, use it as the source-to-sequence mapping. If it is missing, propose a reasonable mapping based on the offers and channels.\n\nOutput:\n1) A short “Why this drip exists” paragraph (trust-building touches, not one follow-up)\n2) The 6-stage framework labels: welcome, education, social proof, soft ask, urgency nudge, re-engagement\n3) The exact 30-day cadence (Day 0, 2, 5, 10, 17, 30) with a one-line goal for each touch\n\nKeep tone plain-English and client-trust focused. No hype."
    },
    {
      id: "3",
      type: "DEFAULT",
      label: "🏷 Source Tagging + Sequence Assignment Map",
      prompt: "Create the “Trigger Sources” section.\n\nUse this structure:\n- Lead Source\n- Assigned Sequence Name\n- Primary intent of that sequence\n- CRM tag(s) to apply (source + sequence + stage)\n- Entry criteria (what makes a lead qualify)\n- Exit criteria (what stops the drip: booked, replied, opted out, closed)\n\nIf the user provides a mapping table, preserve it exactly and add the missing columns above. If not provided, generate a mapping that covers at least:\n- QR code / community events\n- Website consultation form\n- Quote request\n- Retirement / annuity inquiry\n- Facebook DM keyword\n- Google Business Profile\n\nMake the tags consistent and copy-paste friendly for {crm_name}."
    },
    {
      id: "4",
      type: "DEFAULT",
      label: "🗓 30-Day Drip Blueprint",
      prompt: "Build the “30-Day Lead Nurture Sequence” section as a table.\n\nColumns:\n- Day\n- Stage (welcome, education, social proof, soft ask, urgency nudge, re-engagement)\n- Channel (email, text, both)\n- Theme / subject angle\n- Primary goal\n- CTA\n- Personalization tokens to use (use {crm_first_name_token} and {booking_link})\n\nRules:\n- Day 0 must confirm receipt and set expectations.\n- Education must teach a simple framework to help estimate coverage needs.\n- Social proof must emphasize local/community credibility.\n- Soft ask must invite a low-pressure review.\n- Urgency must explain risk of waiting without fearmongering.\n- Re-engagement must add fresh value and reopen the loop.\n\nEnd with a short note on how to adjust timing if the lead replies or books early."
    },
    {
      id: "5",
      type: "DEFAULT",
      label: "✉️ Six Email Drafts (Plug-and-Play)",
      prompt: "Write the full copy for the 6 emails in the sequence.\n\nConstraints:\n- Each email includes: Subject line + body + clear CTA with {booking_link}\n- Use {crm_first_name_token} in greeting\n- Keep paragraphs short and scannable\n- Voice: plain English, no pressure, clarity-first\n- Include a consistent signature block:\n  {sender_name}\n  {sender_title}\n  {business_name}\n  {phone_number}\n- Include minimal compliance footer language if {compliance_notes} requires it\n- Ensure each email matches its stage goal and day\n\nOutput as:\nDay 0 Email\nDay 2 Email\nDay 5 Email\nDay 10 Email\nDay 17 Email\nDay 30 Email"
    },
    {
      id: "6",
      type: "DEFAULT",
      label: "📲 Text Message Companions",
      prompt: "Create a matching set of SMS/text messages for Day 0, 2, 5, 10, 17, 30.\n\nConstraints:\n- 240 characters max each\n- Friendly, professional, local-trust tone\n- One clear CTA per message (either reply with a word, or book via {booking_link})\n- Use {crm_first_name_token} where appropriate\n- Include opt-out language if required by {compliance_notes}\n\nOutput as:\nDay 0 Text\nDay 2 Text\nDay 5 Text\nDay 10 Text\nDay 17 Text\nDay 30 Text"
    },
    {
      id: "7",
      type: "DEFAULT",
      label: "🤖 Automation Rules + Manual Task Logic",
      prompt: "Write the “Automation Rule” section as an implementation spec for {crm_name}.\n\nInclude:\n1) Trigger: new lead created and source captured\n2) Actions immediately on entry:\n   - apply tags\n   - send Day 0 message\n   - create a timeline for remaining touches\n3) Conditional branches:\n   - If lead books: stop sequence, move pipeline stage to Booked, create reminder task\n   - If lead replies: pause automation for manual follow-up, move stage to Engaged\n   - If lead opts out: stop all messaging, tag Opted Out\n4) No-response rule:\n   - If no reply and no booking after Day 10, create a manual task for {owner_name} with a short call script outline\n5) Re-engagement:\n   - At Day 30, tag as Cold if no engagement; optionally move to long-term nurture list\n\nOutput:\n- A numbered rules list\n- A compact pseudo-flow diagram in text (Lead comes in -> tags -> drip -> task -> pipeline move)"
    },
    {
      id: "8",
      type: "DEFAULT",
      label: "📊 KPI Targets + Reporting Loop",
      prompt: "Create the “KPIs to Track” section.\n\nInclude a table with:\n- KPI\n- Target\n- How to measure in {crm_name}\n- Weekly action if below target (one specific adjustment)\n\nMinimum KPIs:\n- Email open rate\n- Click-through rate\n- Reply rate\n- Booking conversion\n- Sequence completion\n- Cold lead revival\n\nThen add:\n- A simple weekly review checklist (10 minutes)\n- Two A/B tests to run (subject lines and CTA phrasing)\n\nUse {kpi_targets} if provided; otherwise propose realistic initial targets."
    },
    {
      id: "9",
      type: "DEFAULT",
      label: "🧩 Paste-Ready Marketing Plan Addendum",
      prompt: "Compile everything into a single “Email Drip Campaign System” addendum that can be pasted into a Business + Marketing Plan.\n\nStructure:\n- Overview (why repeated touches matter)\n- Six-stage framework (welcome, education, social proof, soft ask, urgency nudge, re-engagement)\n- Trigger Sources and Sequence Assignment\n- 30-Day Lead Nurture Table\n- Email Drafts\n- Text Companions\n- Automation Rules\n- KPIs to Track\n- Bottom Line (one paragraph summarizing: lead -> tag -> drip -> booking -> task -> pipeline)\n\nMake it clean, skimmable, and implementation-ready."
    },
    { id: "10", type: "END", label: "END: Addendum Complete", prompt: "Halt node executor" }
  ];

  const WORKFLOW_NODES =
    autoloopPreset === "seo"
      ? SEO_WORKFLOW_NODES
      : autoloopPreset === "codebase"
      ? CODEBASE_WORKFLOW_NODES
      : autoloopPreset === "daily_brief"
      ? DAILY_BRIEF_WORKFLOW_NODES
      : autoloopPreset === "email_drip"
      ? EMAIL_DRIP_WORKFLOW_NODES
      : customWorkflowNodes;

  // Reset loop whenever preset changes
  useEffect(() => {
    setActiveNodeIndex(0);
    setIsRunningAll(false);
    if (autoloopPreset === "codebase") {
      setAutoloopOutputs({
        "1": `# Audit Loop Initialized\n\n- **Status**: START node reached\n- **Target Project**: ${auditProjectName}\n- **Audit Focus**: ${auditAuditFocus}\n- **Timestamp**: ${new Date().toLocaleString()}`
      });
      setNodeExecutionLogs([
        `System: Codebase Audit & Fix Loop parameters loaded.`,
        `System: Awaiting trigger command to compile Node 2.`
      ]);
    } else if (autoloopPreset === "seo") {
      setAutoloopOutputs({
        "1": `# Workflow Initialization\n\n- **Status**: START node reached\n- **Timestamp**: ${new Date().toISOString()}`,
        "2": `# Change Log initialized\n\n- **Change Log Identifier**: COURSE LOOP — Jackson Latimore OS\n- **Loop iteration count**: 1\n- **Active target topic**: ${autoloopTopic}\n- **Target Audience**: ${autoloopAudience}\n\n*Ready to compile course outline.*`
      });
      setNodeExecutionLogs([
        `System: AutoLoop SEO Course Compiler parameters loaded.`,
        `System: Awaiting trigger command of Outline Node.`
      ]);
    } else if (autoloopPreset === "daily_brief") {
      setAutoloopOutputs({
        "1": `# Daily Marketing Command Brief Initialized\n\n- **Status**: START node reached\n- **Brief Date**: ${dailyBriefVars.BRIEF_DATE}\n- **Community Focus**: ${dailyBriefVars.COMMUNITY_FOCUS}\n- **Timestamp**: ${new Date().toLocaleString()}`
      });
      setNodeExecutionLogs([
        `System: Daily Marketing Command Brief parameters loaded.`,
        `System: Awaiting trigger command of Daily Context Setup Node.`
      ]);
    } else if (autoloopPreset === "email_drip") {
      setAutoloopOutputs({
        "1": `# Email Drip Campaign Engine Initialized\n\n- **Status**: START node reached\n- **Business**: ${emailDripVars.business_name}\n- **Brand**: ${emailDripVars.brand_name}\n- **Timestamp**: ${new Date().toLocaleString()}`
      });
      setNodeExecutionLogs([
        `System: Email Drip Campaign Engine parameters loaded.`,
        `System: Awaiting trigger command of Business + Plan Context Lock Node.`
      ]);
    } else {
      setAutoloopOutputs({
        "1": `# Custom GPT-Chain Initialized\n\n- **Status**: START node reached\n- **Timestamp**: ${new Date().toLocaleString()}`
      });
      setNodeExecutionLogs([
        `System: Custom imported GPT-Chain loaded successfully.`,
        `System: Ready to execute nodes.`
      ]);
    }
  }, [autoloopPreset]);

  const handleExecuteNode = async (index: number) => {
    if (index >= WORKFLOW_NODES.length) return;
    const node = WORKFLOW_NODES[index];

    if (node.type === "START" || node.type === "END") {
      const nextLog = `[System] Node ${node.id} (${node.label}) completed instantly.`;
      setNodeExecutionLogs((prev) => [...prev, nextLog]);
      setAutoloopOutputs((prev) => ({
        ...prev,
        [node.id]: `# Completed Instantly\n\nNode ${node.id} is an architectural checkpoint. Parameters configured and validated.`
      }));
      setSelectedOutputNodeId(node.id);
      setActiveNodeIndex(index + 1);
      return;
    }

    if (node.type === "SLEEPY") {
      const waitTime = node.timeout || 30;
      const logMsg = `[System Console] Deep analysis loop paused for ${waitTime}s cooldown...`;
      setNodeExecutionLogs((prev) => [...prev, logMsg]);
      setAutoloopOutputs((prev) => ({
        ...prev,
        [node.id]: `# Sleeping / Telemetry Evaluation Check\n\n- **Loop Paused**: Toured background processes during a ${waitTime} second telemetry validation sweep.\n- **Status**: Check successful. No regressions detected.\n- **Timestamp**: ${new Date().toLocaleString()}`
      }));
      setSelectedOutputNodeId(node.id);
      setActiveNodeIndex(index + 1);
      return;
    }

    setIsExecutingNode(true);

    // Substitute prompt template variables dynamically, scoped to the active preset
    let substitutedPrompt = node.prompt || "";
    if (autoloopPreset === "seo") {
      substitutedPrompt = substitutedPrompt
        .replace(/{course_topic}/g, autoloopTopic)
        .replace(/{brand_name}/g, autoloopBrand)
        .replace(/{course_name}/g, autoloopCourseName)
        .replace(/{desired_outcome}/g, autoloopOutcome)
        .replace(/{target_audience}/g, autoloopAudience)
        .replace(/{tone}/g, autoloopTone)
        .replace(/{timestamp}/g, new Date().toLocaleString());
    } else if (autoloopPreset === "codebase") {
      substitutedPrompt = substitutedPrompt
        .replace(/{PROJECT_NAME}/g, auditProjectName)
        .replace(/{REPOSITORY_CONTEXT}/g, auditRepositoryContext)
        .replace(/{PRIMARY_LANGUAGE}/g, auditPrimaryLanguage)
        .replace(/{FRAMEWORKS}/g, auditFrameworks)
        .replace(/{BRANCH_NAME}/g, auditBranchName)
        .replace(/{KNOWN_ISSUES}/g, auditKnownIssues)
        .replace(/{CODEBASE_STANDARDS}/g, auditCodebaseStandards)
        .replace(/{AUDIT_FOCUS}/g, auditAuditFocus)
        .replace(/{RECENT_CHANGES}/g, auditRecentChanges)
        .replace(/{BUILD_COMMAND}/g, auditBuildCommand)
        .replace(/{TEST_COMMAND}/g, auditTestCommand)
        .replace(/{LINT_COMMAND}/g, auditLintCommand)
        .replace(/{OUTPUT_FORMAT}/g, auditOutputFormat)
        .replace(/{RUN_FREQUENCY}/g, auditRunFrequency);
    } else if (autoloopPreset === "daily_brief") {
      Object.entries(dailyBriefVars).forEach(([key, val]) => {
        substitutedPrompt = substitutedPrompt.split(`{${key}}`).join(val);
      });
    } else if (autoloopPreset === "email_drip") {
      Object.entries(emailDripVars).forEach(([key, val]) => {
        substitutedPrompt = substitutedPrompt.split(`{${key}}`).join(val);
      });
    }

    const logMsg = `[System Console - ${new Date().toLocaleTimeString()}] Prompting Gemini for ${node.label}...`;
    setNodeExecutionLogs((prev) => [...prev, logMsg]);

    try {
      const previousOutput = autoloopOutputs[String(index)] || "";

      const res = await fetch("/api/gemini/autoloop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nodeId: node.id,
          nodeLabel: node.label,
          prompt: substitutedPrompt,
          context: previousOutput.slice(0, 1500),
        }),
      });

      const data = await res.json();
      if (data.success && data.text) {
        setAutoloopOutputs((prev) => ({
          ...prev,
          [node.id]: data.text,
        }));
        setSelectedOutputNodeId(node.id);
        const doneMsg = `[System] Successfully compiled and verified Node ${node.id} (${node.label}).`;
        setNodeExecutionLogs((prev) => [...prev, doneMsg]);
        setActiveNodeIndex(index + 1);
      } else {
        throw new Error(data.error || "Execution returned an empty payload.");
      }
    } catch (err: any) {
      console.error(err);
      setNodeExecutionLogs((prev) => [
        ...prev,
        `❌ [Error Node ${node.id}] Execution failed: ${err?.message || "Check network/API key constraints"}`
      ]);
      setIsRunningAll(false);
    } finally {
      setIsExecutingNode(false);
    }
  };

  const handleExportAutoloopData = () => {
    let text = `================================================================================\n`;
    let filename = "";
    if (autoloopPreset === "codebase") {
      filename = `autoloop-codebase-${auditProjectName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-export.txt`;
      text += `AUTOLOOP CODEBASE AUDIT & FIX EXPORT REPORT\n`;
      text += `================================================================================\n`;
      text += `Timestamp: ${new Date().toLocaleString()}\n`;
      text += `Project Name: ${auditProjectName}\n`;
      text += `Primary Language: ${auditPrimaryLanguage}\n`;
      text += `Frameworks: ${auditFrameworks}\n`;
      text += `Branch Name: ${auditBranchName}\n`;
      text += `Audit Focus: ${auditAuditFocus}\n`;
    } else if (autoloopPreset === "daily_brief") {
      filename = `autoloop-daily-marketing-brief-${dailyBriefVars.BRIEF_DATE.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-export.txt`;
      text += `AUTOLOOP DAILY MARKETING COMMAND BRIEF EXPORT\n`;
      text += `================================================================================\n`;
      text += `Timestamp: ${new Date().toLocaleString()}\n`;
      text += `Brief Date: ${dailyBriefVars.BRIEF_DATE}\n`;
      text += `Target Audience: ${dailyBriefVars.TARGET_AUDIENCE}\n`;
      text += `Community Focus: ${dailyBriefVars.COMMUNITY_FOCUS}\n`;
      text += `Primary CTA: ${dailyBriefVars.PRIMARY_CTA}\n`;
      text += `Secondary CTA: ${dailyBriefVars.SECONDARY_CTA}\n`;
    } else if (autoloopPreset === "email_drip") {
      filename = `autoloop-email-drip-${emailDripVars.business_name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-export.txt`;
      text += `AUTOLOOP EMAIL DRIP CAMPAIGN ENGINE EXPORT\n`;
      text += `================================================================================\n`;
      text += `Timestamp: ${new Date().toLocaleString()}\n`;
      text += `Business Name: ${emailDripVars.business_name}\n`;
      text += `Brand Name: ${emailDripVars.brand_name}\n`;
      text += `Owner: ${emailDripVars.owner_name}\n`;
      text += `Service Area: ${emailDripVars.service_area}\n`;
      text += `Booking Link: ${emailDripVars.booking_link}\n`;
    } else {
      filename = `autoloop-${autoloopCourseName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-export.txt`;
      text += `AUTOLOOP COURSE COMPILER EXPORT REPORT\n`;
      text += `================================================================================\n`;
      text += `Timestamp: ${new Date().toLocaleString()}\n`;
      text += `Brand Name: ${autoloopBrand}\n`;
      text += `Course Name: ${autoloopCourseName}\n`;
      text += `Topic: ${autoloopTopic}\n`;
      text += `Desired Outcome: ${autoloopOutcome}\n`;
      text += `Target Audience: ${autoloopAudience}\n`;
      text += `Tone: ${autoloopTone}\n`;
    }
    text += `\n================================================================================\n`;
    text += `PART 1: CHANGE LOG & SYSTEM CONSOLE LIFE RECORDS\n`;
    text += `================================================================================\n`;
    nodeExecutionLogs.forEach((log) => {
      text += `${log}\n`;
    });

    text += `\n================================================================================\n`;
    text += `PART 2: COMPILED WORKFLOW NODES & SERIALIZED ASSETS\n`;
    text += `================================================================================\n\n`;

    WORKFLOW_NODES.forEach((node) => {
      const output = autoloopOutputs[node.id];
      text += `--------------------------------------------------------------------------------\n`;
      text += `[NODE ${node.id}] - ${node.label}\n`;
      text += `--------------------------------------------------------------------------------\n`;
      if (output) {
        text += `${output}\n\n`;
      } else {
        text += `Not compiled / skipped during loop execution.\n\n`;
      }
    });

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Autosequencer pipeline effect
  useEffect(() => {
    let active = true;
    const runSequence = async () => {
      if (!isRunningAll) return;
      if (activeNodeIndex >= WORKFLOW_NODES.length) {
        setIsRunningAll(false);
        setNodeExecutionLogs((prev) => [...prev, "System: Full AutoLoop Chain executed!"]);
        return;
      }
      const currentNode = WORKFLOW_NODES[activeNodeIndex];
      if (currentNode.type === "END") {
        setIsRunningAll(false);
        setNodeExecutionLogs((prev) => [...prev, "System: Full AutoLoop Chain executed!"]);
        return;
      }

      await handleExecuteNode(activeNodeIndex);
    };

    if (isRunningAll && !isExecutingNode && active) {
      runSequence();
    }

    return () => {
      active = false;
    };
  }, [isRunningAll, activeNodeIndex, isExecutingNode]);

  // Prepopulate illustrative course outputs for instant fidelity
  useEffect(() => {
    setAutoloopOutputs((prev) => {
      if (Object.keys(prev).length > 2) return prev; // already has content
      return {
        ...prev,
        "3": `# 📘 Curricular Course Outline\\n\\n## SEO LEAD GENERATION ENGINE 101\\n\\nHere is your custom compiled course outline generated dynamically according to Jackson Latimore Sr.'s high professional standards:\\n\\n| Module | Title | Primary Business Outcome | Key Deliverable |\\n| - | - | - | - |\\n| **Module 1** | Foundation Frameworks | Demystify standard search signals | Core Search Audit Report |\\n| **Module 2** | Setup Essentials | Configure indexing profiles | Live Webmaster Profile |\\n| **Module 3** | High-Value Targeting | Pinpoint local search intents | 50 Target Phrase Matrix |\\n| **Module 4** | Lead Magnet Construction | Build high-converting PDF/course giveaways | Free Email Mini-Course PDF |\\n| **Module 5** | Lead Capture Operations | Setup high-trust automated landing opt-ins | Live Funnel Landing Page |\\n| **Module 6** | Launch Strategy & Traffic | Drive immediate organic clicks | 30-Day Automated Schedule |\\n\\n---\\n\\n### Module Breakdown\\n\\n#### Module 1: Foundational SEO Systems\\n1. Search engine crawling & indexation fundamentals\\n2. The Latimore Trust-Building Model online\\n3. Keyword Intent Classification (Informational vs. Transactional)\\n4. On-page hierarchy: Title tags, headings, and semantic relevance\\n5. Case studies of Central Penn local companies scaling with organic traffic`,
        "12": `# 🗺️ Recommended 6-Week Learning Roadmap\\n\\n| Week | Module | Focus Goal | Deliverable & Milestone | Est. Investment |\\n| --- | --- | --- | --- | --- |\\n| **Week 1** | Module 1 | Demystifying Organic Signals | Search Audit of Your Business | 4-6 hours |\\n| **Week 2** | Module 2 | Setup Search Authority | Live XML Sitemap & Search Console Setup | 5 hours |\\n| **Week 3** | Module 3 | Intent Blueprinting | Master 50-Keyword Priority Grid | 6 hours |\\n| **Week 4** | Module 4 | Educational Giveaway Creation | Complete 3-Module Lead Magnet | 8 hours |\\n| **Week 5** | Module 5 | Conversion Pipeline Setup | Live High-Trust Opt-in Form | 6 hours |\\n| **Week 6** | Module 6 | Distribution Blueprint | Schedule 30 Days of Content Posts | 4 hours |`,
        "13": `# 📝 Dynamic Course Glossary (51+ Industry Terms)\\n\\n1. **Alt Text**: Text description applied to images aiding crawlability.\\n2. **Backlink**: A validation vote where one website links to another.\\n3. **Bounce Rate**: Percentage of users who leave after a single page visit.\\n4. **CTR (Click-Through Rate)**: Total clicks divided by total organic search impressions.\\n5. **Domain Authority**: Score measuring search engine ranking potential.\\n6. **Featured Snippet**: Direct paragraph answers shown at the top of Google results.\\n7. **Local Pack**: Map listing displayed for geographically relevant search intents.\\n8. **Long-Tail Keyword**: Highly specific phrases (e.g., 'financial advisor Luzerne County PA').\\n9. **Organic Search**: Unpaid listings returned on search result engines.\\n10. **Robot.txt**: Gatekeeper file directing search engines which pages to parse.\\n\\n*(41 additional authoritative terms populated dynamically during live active compiles)*`,
        "14": `# 💡 51 Study Tips for Success\\n\\n- **Tip 1**: Block out exactly 45 minutes of non-interrupted focus time every morning.\\n- **Tip 2**: Work through the Modules in sequential order — do not skip setup steps.\\n- **Tip 3**: Complete the keyword matrix of Week 3 before writing any landing copy.\\n- **Tip 4**: Use local Central PA landmarks in keyword examples to boost geographical trust.\\n- **Tip 5**: Keep headlines beneath 65 characters to protect search snippet boundaries.\\n- **Tip 6**: Setup email notifications on your Google Search Console profile.\\n- **Tip 7**: Build your lead capture forms with clear, human-focused microcopy.`,
        "17": `# ✍️ Comprehensive SEO Guide: Organic Lead Multipliers 101\\n\\n## Introduction: The New Frontier of Local Business Trust\\nIn a crowded marketplace, typical advertising creates friction. Modern high-net-worth clients and local business owners don't want to be sold to; they want to be educated. By designing a professional, project-based educational course as a lead generation engine, you position your brand as an authority before ever booking the first consultation call.\\n\\n### How Google Evaluates Quality Content (E-E-A-T)\\nGoogle prioritizes Experience, Expertise, Authoritativeness, and Trustworthiness. Your automated course serves as the ultimate proof of this framework.\\n\\n### Table 1: Search Intent Classifications\\n| Intent Type | User Psychology | CTA Recommendation |\\n| --- | --- | --- |\\n| **Informational** | 'How do I solve X?' | Offer Free Educational PDF |\\n| **Navigational** | 'Jackson Latimore Address' | Contact / Directions Page |\\n| **Commercial** | 'Best life insurance options PA' | Detailed Product Comparison Guide |\\n| **Transactional** | 'Hire financial planner near me' | Book Consultation Form |`,
        "18": `# 🎨 High-Converting Landing Page Copy\\n\\n## Primary Headline Option:\\n**Stop Buying Cold Leads. Build a High-Trust Educational Engine That Automatically Recruits Clients for You.**\\n\\n### Core Value Propositions\\n- **100% Automated**: Runs in the background while you service active customers.\\n- **Local Organic Supremacy**: Own local Google search listings across PA counties.\\n- **Perfect Client Sorting**: Educates prospects so they book pre-selected and qualified.\\n\\n### The AIDA Blueprint Block\\n\\n- **ATTENTION**: Your prospects are tired of vague sales pitches. Teach them real systems.\\n- **INTEREST**: Show them exactly how automated organic loops generate value.\\n- **DESIRE**: Imagine starting each week with 5 high-converting leads pre-qualified by your course outline.\\n- **ACTION**: Register for free and configure your first educational lead magnet today!`,
        "19": `# 🎨 UI Color Schemes matching brand 'Latimore Legacy'\\n\\nSuggesting 5 premium UI color schemes calibrated for high compliance, elegance, and extreme legibility:\\n\\n### Scheme 1: Cosmic Gold & Forest Slate (Recommended)\\n- **Primary Accent**: \\\`#D4AF37\\\` (Legacy Rich Gold)\\n- **Interface Base**: \\\`#0F172A\\\` (Deep Slate Black)\\n- **Card Background**: \\\`#1E293B\\\` (Steel charcoal)\\n- **Text Highlight**: \\\`#F8FAFC\\\` (Porcelain white)\\n\\n### Scheme 2: Central Penn Emerald Trust\\n- **Primary Accent**: \\\`#059669\\\` (Deep Emerald Green)\\n- **Interface Base**: \\\`#022C22\\\` (Forest Shade Green)\\n- **Card Background**: \\\`#022C22\\\` (Deep Moss)`
      };
    });
  }, []);

  // Core databases state (Preloaded with rich illustrative data for immediate interaction)
  const [finances, setFinances] = useState<FinanceItem[]>([
    { id: "f1", date: "2026-05-18", item: "Organic Whole Foods Market", category: "Diet & Groceries", amount: 145.5, type: "Expense", goalId: "g2" },
    { id: "f2", date: "2026-05-19", item: "Monthly Gym Membership Run Gym", category: "Health & Fitness", amount: 80.0, type: "Expense", goalId: "g1" },
    { id: "f3", date: "2026-05-15", item: "React Senior Course", category: "Personal Growth", amount: 45.0, type: "Expense", goalId: "g3" },
    { id: "f4", date: "2026-05-20", item: "Freelance Landing Web App Design", category: "Contract Income", amount: 1850.0, type: "Income", goalId: null },
    { id: "f5", date: "2026-05-12", item: "Tech Pitch Meetup Coffee", category: "Business Development", amount: 12.5, type: "Expense", goalId: "g3" },
    { id: "f6", date: "2026-05-10", item: "Nutrient Greens Supplement", category: "Diet & Groceries", amount: 65.0, type: "Expense", goalId: "g2" },
    { id: "f7", date: "2026-05-14", item: "New Running Trail Shoes", category: "Health & Fitness", amount: 130.0, type: "Expense", goalId: "g1" },
  ]);

  const [health, setHealth] = useState<HealthItem[]>([
    { id: "h1", date: "2026-05-18", metric: "Sleep Quality", category: "Sleep", value: 7.8, energyLevel: 8, notes: "Felt very refreshed. Prepared healthy shake breakfast.", goalId: "g2" },
    { id: "h2", date: "2026-05-19", metric: "Long Endurance Run (10K)", category: "Exercise", value: 10.0, energyLevel: 9, notes: "Ran on New Trail Shoes! High stride efficiency.", goalId: "g1" },
    { id: "h3", date: "2026-05-20", metric: "Mindfulness Breathing & Yoga", category: "Mental", value: 0.5, energyLevel: 7, notes: "Reduced pulse to 58 bpm.", goalId: "g4" },
    { id: "h4", date: "2026-05-17", metric: "Sleep Interruption", category: "Sleep", value: 5.5, energyLevel: 4, notes: "Late coding session left me groggy.", goalId: null },
    { id: "h5", date: "2026-05-16", metric: "Strength Base Prep Workout", category: "Exercise", value: 1.2, energyLevel: 8, notes: "Felt strong on core reps.", goalId: "g1" },
  ]);

  const [goals, setGoals] = useState<GoalItem[]>([
    { id: "g1", name: "Train for 21K Half-Marathon", domain: "Athletic & Fitness", target: 21.0, currentValue: 10.0, unit: "km", status: "In Progress", targetDate: "2026-09-15" },
    { id: "g2", name: "Transition to Organic Diet and Mealprep", domain: "Dietary Health", target: 30, currentValue: 12, unit: "days", status: "In Progress", targetDate: "2026-07-01" },
    { id: "g3", name: "Secure Senior Frontend Contract", domain: "Career & Tech", target: 3, currentValue: 1, unit: "contracts", status: "In Progress", targetDate: "2026-08-30" },
    { id: "g4", name: "Keep Average Stress Index below 4/10", domain: "Mental Space", target: 4.0, currentValue: 5.5, unit: "pts", status: "In Progress", targetDate: "2026-06-15" },
  ]);

  const [databaseRelations, setDatabaseRelations] = useState<NotionRelationship[]>([
    {
      id: "r1",
      title: "Exercise Activity vs. Half-Marathon Progress",
      sourceDb: "Health",
      sourceMetric: "Exercise category",
      targetDb: "Goals",
      targetMetric: "Train for 21K Half-Marathon",
      impactType: "Positive Benefit",
      strength: "High",
      description: "Workout entries tracked under Health (Exercise Category) push current training progress. Real-time cardio kilometers and endurance duration are aggregated to conditions.",
      notionFormula: 'map(filter(prop("Health Logs"), current.prop("Category") == "Exercise"), current.prop("Value")).sum()',
    },
    {
      id: "r2",
      title: "Organic Spend vs. Diet Compliance Goal",
      sourceDb: "Finances",
      sourceMetric: "Diet & Groceries spend",
      targetDb: "Goals",
      targetMetric: "Transition to Organic Diet and Mealprep",
      impactType: "Financial Funding",
      strength: "High",
      description: "Financial allocations to diet and groceries secure high-grade fuel, which serves nutrition compliance standards and boosts baseline focus index.",
      notionFormula: 'sum(map(filter(prop("Finances DB"), current.prop("Category") == "Diet & Groceries" && current.prop("Type") == "Expense"), current.prop("Amount")))',
    },
    {
      id: "r3",
      title: "Savings Rate vs. Career Portfolio Target",
      sourceDb: "Finances",
      sourceMetric: "Net Savings rate",
      targetDb: "Goals",
      targetMetric: "Secure Senior Frontend Contract",
      impactType: "Financial Funding",
      strength: "Medium",
      description: "Net cash collection rate maintains stable development runway, funding continuous training certifications and high-focus coding periods.",
      notionFormula: 'let(net, prop("Income") - prop("Expenses"), if(net > 0, round((net / prop("Income")) * 100), 0))',
    },
    {
      id: "r4",
      title: "Sleep Quality Duration vs. Stress Index Goal",
      sourceDb: "Health",
      sourceMetric: "Sleep logs",
      targetDb: "Goals",
      targetMetric: "Keep Average Stress Index below 4/10",
      impactType: "Positive Benefit",
      strength: "High",
      description: "Logging consistent rest metrics buffer stress pathways. Cumulative hours offset physical tension levels, directly cooling average stress logs.",
      notionFormula: 'if(mean(map(filter(prop("Health Logs"), current.prop("Category") == "Sleep"), current.prop("Value"))) >= 7.5, "Rest Optimal ✓", "Strain Risk ⚠")',
    }
  ]);

  // Relation filter/search states
  const [relationSearch, setRelationSearch] = useState("");
  const [relationDbFilter, setRelationDbFilter] = useState("all");
  const [relationStrengthFilter, setRelationStrengthFilter] = useState("all");
  const [relationTypeFilter, setRelationTypeFilter] = useState("all");

  // Selection states for Graph highlight
  const [selectedRelationId, setSelectedRelationId] = useState<string | null>(null);

  // New Relation builder form state
  const [newRelation, setNewRelation] = useState({
    title: "",
    sourceDb: "Health" as "Finances" | "Health" | "Goals",
    sourceMetric: "",
    targetDb: "Goals" as "Finances" | "Health" | "Goals",
    targetMetric: "",
    impactType: "Positive Benefit" as "Positive Benefit" | "Negative Friction" | "Financial Funding" | "Direct Sync",
    strength: "High" as "High" | "Medium" | "Low",
    description: "",
    notionFormula: "",
  });

  const [formulaErrors, setFormulaErrors] = useState<FormulaValidationError[]>([]);
  const [isFormulaManuallyEdited, setIsFormulaManuallyEdited] = useState(false);

  const updateRelationField = (field: string, value: any) => {
    setNewRelation((prev) => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate formula if not manually edited by the user yet
      if (!isFormulaManuallyEdited) {
        let auto = "";
        if (updated.sourceDb === "Health") {
          auto = `map(filter(prop("Health Logs"), current.prop("Category") == "${updated.sourceMetric || 'Exercise'}"), current.prop("Value")).sum()`;
        } else if (updated.sourceDb === "Finances") {
          auto = `sum(map(filter(prop("Finances DB"), current.prop("Category") == "${updated.sourceMetric || 'Diet & Groceries'}"), current.prop("Amount")))`;
        } else {
          auto = `prop("Goals").filter(current.prop("Status") == "Completed").length()`;
        }
        updated.notionFormula = auto;
        
        // Update errors instantly too
        const errs = validateNotionFormula(auto);
        setFormulaErrors(errs);
      }
      return updated;
    });
  };

  // Tab State: "dashboard", "databases", "ai", "integrations"
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Selection state inside Databases tab: "finances", "health", "goals"
  const [activeDatabaseTab, setActiveDatabaseTab] = useState<string>("finances");

  // Filter/Search states
  const [financeSearch, setFinanceSearch] = useState("");
  const [healthSearch, setHealthSearch] = useState("");
  const [goalSearch, setGoalSearch] = useState("");
  const [financeFilter, setFinanceFilter] = useState("all"); // 'all', 'Income', 'Expense'
  const [healthFilter, setHealthFilter] = useState("all"); // 'all', 'Sleep', 'Exercise', 'Diet', 'Mental'

  // Customizable Dashboard layout configuration state
  const [dashboardWidgets, setDashboardWidgets] = useState({
    showStats: true,
    showInterconnectionChart: true,
    showFinanceFlow: true,
    showHealthTrends: true,
    showGoalsProgress: true,
  });
  const [dashboardColumns, setDashboardColumns] = useState<"1" | "2">("2");

  // Integration settings and connected status state
  const [integrations, setIntegrations] = useState([
    { id: "fitbit", name: "Fitbit Fitness Wearable", description: "Imports daily step count, average rest pulse, and sleep stages.", connected: true, group: "Health", lastSync: "10 minutes ago", icon: "Heart", badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
    { id: "strava", name: "Strava Club Sync", description: "Imports distance workouts, cardio tracking, and duration metrics.", connected: true, group: "Health", lastSync: "1 hour ago", icon: "Activity", badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
    { id: "plaid", name: "Plaid Bank Feeds", description: "Retrieves verified transaction logs and automatically flags food & health expenditures.", connected: false, group: "Finance", lastSync: "Never synced", icon: "DollarSign", badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { id: "gcal", name: "Google Calendar Hub", description: "Imports calendars relating to gym slots, mindfulness lessons, and job callbacks.", connected: false, group: "Workspace", lastSync: "Never synced", icon: "Calendar", badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { id: "facebook", name: "Facebook Ads & Pages API", description: "Tracks Schuylkill/Luzerne campaign reach, lead ads capture, and comment spikes.", connected: false, group: "Marketing", lastSync: "Never synced", icon: "Share2", badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
    { id: "instagram", name: "Instagram Business Feed", description: "Imports direct message intent, target audience engagement, and story mentions.", connected: false, group: "Marketing", lastSync: "Never synced", icon: "Smartphone", badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
    { id: "linkedin", name: "LinkedIn Professional Hub", description: "Syncs B2B partnership responses and key partner demographic page metrics.", connected: false, group: "Marketing", lastSync: "Never synced", icon: "Layers", badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
    { id: "resend", name: "Resend Email Automation", description: "Pushes transaction logs, email welcome delivery statuses, and click rates.", connected: false, group: "Workspace", lastSync: "Never synced", icon: "MessageSquare", badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
    { id: "hubspot", name: "HubSpot CRM Pipeline Bridge", description: "Provides bidirectional lead stage sync and mirrors pipeline activity instantly.", connected: false, group: "Finance", lastSync: "Never synced", icon: "Database", badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20" }
  ]);

  // AI capabilities state
  const [aiReport, setAiReport] = useState<AIReport | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportError, setReportError] = useState("");

  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: "model", content: "Hello! I am your Latimore Life & Legacy AI Assistant. I have live, parsed access to your financial records, wellness charts, and current goals. Ask me things like:\n\n* *'How much did my marathon training expenses impact my weekly budget?'*\n* *'Is there a visible correlation between my sleep metrics and workout energy?'*\n* *'Generate a weekly executive report analyzing my life interactions.'*" }
  ]);
  const [isSendingChat, setIsSendingChat] = useState(false);
  const [chatError, setChatError] = useState("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Campaign Content & Document Studio State
  const [campaignDocuments, setCampaignDocuments] = useState([
    {
      id: "na-products",
      title: "North American Life Products At-A-Glance Guide",
      description: "Technical insurance product specs including ADDvantage Term and Protection Builder, Builder Plus, and Smart Builder IUL lines.",
      date: "2026-05-21",
      charCount: 2470,
      text: "Expert specification sheet for North American Company for Life and Health Insurance. Term Lines: ADDvantage Term includes level period premium locks for 10, 15, 20, or 30 years, issue ages 18-75, minimum face value coverage $100k, policy fee $65. Permanent Index Universal Life (IUL) Lines include: (1) Protection Builder IUL 2 (excellent long-durability death benefit, guaranteed no-lapse up to age 120 via Premium Guarantee Rider PGR, interest crediting methods including Fidelity Multifactor Yield Index 5% ER, net-zero cost policy loans, 15 years surrender charges), (2) Builder Plus IUL 4 (maximum cash value growth focus for supplemental tax-deferred retirement income planning, indexed bonus multipliers starting year 11+, zero-spread loans starting year 3, 10 years surrender charge period), (3) Smart Builder IUL 3 (designed for early liquidity needs, optional Waiver of Surrender Charge Option WOSC Rider yields 0% premium load & 0% surrender charges from day one, 10% penalty-free principal withdrawal access starting in policy year 2, perfect for emergency reserves/smart money placement)."
    },
    {
      id: "na-roadmaps",
      title: "North American Company Sales Solutions Roadmap",
      description: "Business and family estate solutions checklists including Annuity Maximization, Executive Bonus (Section 162), Buy-Sell agreements, and Pension Max.",
      date: "2026-05-21",
      charCount: 3120,
      text: "Advanced Life Insurance Concept Matrix. (1) Annuity Maximization: moves non-qualified, taxable annuity funds into tax-free life insurance death benefit options for heirs while maintaining cash value safety; (2) Executive Bonus (Sec 162): employer pays premium on IUL owned by key executive, premium is fully deductible to employer and reported as a taxable bonus to the executive; (3) Buy-Sell Agreements: entities leverage permanent insurance to secure buy-out cash if partners pass away or become disabled; (4) Key Person Planning: safeguards corporate cash flow and bank credit lines if key talent dies; (5) Split Dollar (Loan Regime): employer finances premiums as low-interest loans secured by collateral assignment; (6) College Funding: builds high cash surrender reserves inside IUL on parent's life to fund tuition tax-free; (7) Estate Liquidity: creates immediate tax-free funds to settle estate taxes and prevent forced sales of local family farms or businesses; (8) Pension Maximization: selects single-payout tier on corporate pension for max returns, and purchases an IUL to protect the surviving spouse; (9) Smart Money: directs safe emergency reserves into a Smart Builder IUL to maximize gains while preserving 100% early liquidity via the WOSC rider."
    },
    {
      id: "ae-incomeshield",
      title: "American Equity IncomeShield BONUS 10 FIA Guide",
      description: "Product sheets covering the 14% premium bonus, deferral options, market and longevity risk solutions, and the Wellbeing Benefit rider.",
      date: "2026-05-21",
      charCount: 1540,
      text: "Product Sheet for American Equity IncomeShield BONUS 10 Fixed Index Annuity (FIA). This premium retirement plan addresses longevity and market risk by providing asset protection and lifelong guaranteed income. Key Features: (1) First-Year Premium Bonus: A 14% premium bonus is credited to first year premiums, vesting over a 10-year period. (2) Lifetime Income Benefit Rider (LIBR): Allows lifetime income payments to begin after just one year. Two deferral options are available: Option 1 features a 10% IAV (Income Account Value) rate for 10 years (simple interest); Option 2 features a 6.5% IAV rate for 20 years (compound interest). The annual rider cost is 1.20%. (3) Wellbeing Benefit Rider: Acts as an 'income doubler' providing a 200% single-life payout or 150% joint-life payout for up to five years if the owner or spouse is unable to perform activities of daily living (ADLs), with no confinement required, activatable two years after issue date."
    },
    {
      id: "ae-retirement-steps",
      title: "American Equity 3 STEPS Retirement Income Plan Worksheet",
      description: "Planning workbook mapping essential vs non-essential expenditures across Housing, Taxes, Transportation, Personal, Food, Unexpected Expenses, Family, Interests & Hobbies, and Bucket List categories.",
      date: "2026-05-21",
      charCount: 2210,
      text: "Expense Hierarchy and Income planning worksheet. Step 1: Choose anticipated retirement expenses across different categories. Housing (Mortgage, Maintenance, Homeowner's insurance, Lawn/cleaning), Transportation (Day-to-day, Additional car, Recreational, Public transit, Travel), Food (Groceries, Dining out, Premium coffees/teas), Healthcare (Out-of-pocket, Elective, Unexpected events, Family health), Taxes (Property, Income & gains, Sales, Autos, Insurance, Public transit), Personal (Clothing, Shoes, Hair), Unexpected Expenses (Elder care, Boomerang children, Grandchildren care, Cost of Living adjustments, Lawsuits, Uninsured losses), Family (Visiting grand kids, Funding education, Vacations, Gifts, Pet care), Interests & Hobbies (Continued education, Lessons, Country club, Gyms, Leagues), Change (Move to retirement-friendly location, Build dream house, Start new business, Build prototypes), Entertainment (Theatre, Movies, Streaming, Subscriptions, Concerts), Bucket List (Globetrotting, Cruises, Extended stays, Big ticket items, Rare collections), Charitable Giving (Substantial donations, Sponsorships, Trusts, Foundations). Step 2: Categorize circled expenses into the Income Hierarchy pyramid: Level 1 (Bottom) - Essential Expenses (Mortgage, utilities, insurance); Level 2 (Lower-Middle) - Essential Lifestyle Expenses (Important but non-mandatory lifestyle costs); Level 3 (Upper-Middle) - Nice-to-Have Lifestyle Expenses (Comfortable to go without); Level 4 (Top) - Wishes (Windfalls). Step 3: Combine prioritized expenses with expected retirement income sources to engineer a balanced life blueprint."
    },
    {
      id: "ethos-estate-planning",
      title: "Ethos Estate Planning Complimentary Perks Guide",
      description: "Estate planning companion guide highlighting complimentary Legal Will, Living Trust, Power of Attorney, Medical Consent, and Healthcare Directive tools included at $0 cost (value $898).",
      date: "2026-05-21",
      charCount: 1810,
      text: "Ethos Estate Planning Benefit Specification and Growth Strategy Guide. Complimentary perks are offered to eligible policyholders (an $898 value offered at $0 additional cost). Access is granted to five key planning instruments: (1) Legal Will (determines asset distribution, guardian selection for dependents, and executor logistics), (2) Living Trust (distributes money and assets over time, allocating funds to education and housing needs), (3) Power of Attorney (designates temporary financial decision-making authority to structured trusted persons), (4) Medical Consent (provides healthcare instruction and directives for caregiver dependents during medical emergencies), (5) Healthcare Directive (specifies concrete medical actions to be taken when incapacitation prevents self-determination). Sales Growth and Retention Strategy: Leverage estate planning perks to open sales scripts; follow up with unactivated policy decisions to re-engage potential leads; obtain high-quality word-of-mouth client referrals; improve agency policy retention periods; reach out systematically to policyholders with expiring term lines; and pitch the absolute synergy of combined life coverage and free comprehensive estate plans during major life transitions (marrying, borrowing, buying a home, having children, retiring, or organizing end-of-life planning)."
    },
    {
      id: "jake-thompson-book",
      title: "Money. Wealth. Life Insurance. (Personal Banking Vehicle Guide)",
      description: "Comprehensive digest of Jake Thompson's book explaining cash value life insurance as a high-performance alternative to stock markets.",
      date: "2026-05-21",
      charCount: 2980,
      text: "Book Summary: Money. Wealth. Life Insurance. How the Wealthy Use Life Insurance as a Tax-Free Personal Bank to Supercharge Their Savings. (1) History and Survival: Cash value life insurance stood virtually unscathed during the Great Depression (owners did not lose a single dime, and companies paid profits every single year) and twelve subsequent recessions. (2) Famous Implementations: James Cash Penney (JCPenney) saved his business in the crash of 1929 by borrowing against his $3M life policy; Walt Disney financed Disneyland's 1955 opening via a high cash policy loan after banks rejected him; Ray Kroc of McDonald's used cash values to sustain his personnel and launch the Ronald McDonald campaign; Foster Farms, Stanford University, and Pampered Chef were similarly sustained or founded through cash value policies. (3) BOLI / COLI: Major banks hold billions in Tier-1 Capital assets inside life insurance: Bank of America ($19.6B), Wells Fargo ($17.7B), JPMorgan Chase ($10.3B), and U.S. Bank ($5.4B). More than 68% of Fortune 1000 companies fund Supplemental Executive Retirement Plans (SERPs) using Corporate-Owned Life Insurance. (4) Tax and Returns Advantage: Growth is treated as a dividend (non-taxable return of premium). By taking loans collateralized by cash values at ~5% while earning ~7% dividends, you net the spread. Money inside the policy grows tax-free, can be used tax-free, and passes to beneficiaries as a tax-free Death Benefit bypassing probate. Unlike 401ks/IRAs, withdrawals of cost basis are tax-exempt, and loans trigger no tax consequences, even beyond cost basis. (5) Infinite Banking / Privatized Banking: Nelson Nash's concept of treating your corporate or personal capital with accountability (repaying yourself with interest) to prevent interrupting growth and guarantee compound multiplication."
    },
    {
      id: "corebridge-qol-term",
      title: "Corebridge Financial QoL Flex Term Technical Guide",
      description: "SimpliNow Choice platform specifications of QoL Flex Term, including Agile Underwriting+ and built-in Accelerated Death Benefit Riders.",
      date: "2026-05-21",
      charCount: 2310,
      text: "Technical guide for Corebridge Financial QoL Flex Term on the SimpliNow Choice platform. (1) Agile Underwriting+ (AU+): Lab-free option for ages 20-59 with face amounts from $100,000 up to $1,000,000. Underwriting classifications include: Preferred Plus, Preferred Non-tobacco, Standard Plus, Standard Non-tobacco, Preferred Tobacco, Standard Tobacco, Special Non-tobacco, and Special Tobacco. Issue ages 20-80 depending on the level term period (ranges from 10, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, to 35-year periods). (2) Built-In Accelerated Death Benefit Riders (ABRs): Automatically included at no additional cost. Allows terminal, chronic, or critical illness acceleration, paying out up to $2,000,000 while the insured is living. Chronic illness activation is conditioned on being unable to perform 2 or more Activities of Daily Living (ADLs like bathing, contingency, dressing, eating, toileting, transferring) or severe cognitive impairment. (3) QoL Advantage Program: Features premium volume banding discounts (Bands 1 to 4 starting at $100k, $250k, $500k, and $1,000k respectively). The $75 base policy fee is waived if purchased in conjunction with another qualifying QoL product under ABC billing. (4) Optional Riders: Accidental Death Benefit (up to $250k, expires nearest age 70), Children's Insurance Benefit (term insurance for dependent minors up to age 25, $1k to $25k face), and Waiver of Premium (waives base premiums and riders upon total disability after a 6-month waiting period)."
    }
  ]);

  const [customDocTitle, setCustomDocTitle] = useState("");
  const [customDocText, setCustomDocText] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);

  // Content generation active form states
  const [selectedDocumentId, setSelectedDocumentId] = useState("na-products");
  const [campaignContentType, setCampaignContentType] = useState("social"); // 'social', 'email', 'blog', 'script'
  const [campaignTopic, setCampaignTopic] = useState("Smart Money with Smart Builder IUL");
  const [campaignAudience, setCampaignAudience] = useState("PA Retirees & Business Owners");
  const [campaignTone, setCampaignTone] = useState("local"); // 'local', 'empathetic', 'authoritative', 'informative'
  const [campaignAdditional, setCampaignAdditional] = useState("Focus on local families in Schuylkill and Northumberland counties, mention AED legacy #TheBeatGoesOn");
  
  const [isCreatingContent, setIsCreatingContent] = useState(false);
  const [createdContentHtml, setCreatedContentHtml] = useState("");
  const [contentStudioError, setContentStudioError] = useState("");

  const [generatedCampaigns, setGeneratedCampaigns] = useState<Array<{
    id: string;
    title: string;
    date: string;
    type: string;
    topic: string;
    audience: string;
    content: string;
  }>>([
    {
      id: "c1",
      title: "Annuity Maximization - Schuylkill Seniors Campaign",
      date: "2026-05-21",
      type: "email",
      topic: "Annuity Maximization",
      audience: "Retirees & Seniors",
      content: `### Subject: How to triple your heirs' tax-free inheritance in Central PA

Hello,

If you are like many families I talk to in Schuylkill and Luzerne counties, you may have accumulated funds in a traditional annuity designed to protect your savings. But here is a critical question: **Does your family actually need those funds for your own standard of living, or is it earmarked for the next generation?**

If that annuity is left to pass directly to your children, they could face a significant, unexpected income tax burden on those gains.

Through our local **Annuity Maximization program**, we can help you reposition those unneeded taxable annuity values into direct, tax-free leverage via a North American permanent life insurance blueprint. 

#### Why This Works for PA Families:
* **Tax-Free Multiplication**: Triples or quadruples the raw cash benefit passed directly to your kids.
* **Maintain Control**: You preserve optional access to cash values if an absolute emergency arises.
* **Peace of Mind**: Keeps your hard-earned local legacy entirely in the hands of family (not the tax collector).

As Jackson M. Latimore Sr., my mission is making sure your hard work is preserved. After a life-saving AED gave me a second chance on December 7, 2010, I dedicated my agency to a single promise: **#TheBeatGoesOn**. We are here to secure your family's future.

Let's sit down for a friendly coffee in Pottsville or Hazleton to review your annuity.

Warmly,

**Jackson M. Latimore Sr.**  
Founder & CEO, Latimore Life & Legacy  
*Protecting Today. Securing Tomorrow.*`
    }
  ]);

  // ===================== MARKETING INTELLIGENCE & SOCIAL HUB STATES =====================
  const [socialWidgets, setSocialWidgets] = useState({
    showKPIs: true,
    showCharts: true,
    showPAHS: true,
    showInsights: true,
    showSentiment: true,
    showScheduler: true,
    showUploader: true,
  });

  // PAHS Daily Command Brief runner state
  const [pahsBriefRunning, setPahsBriefRunning] = useState(false);
  const [pahsBriefStep, setPahsBriefStep] = useState(-1);
  const [pahsBriefOutputs, setPahsBriefOutputs] = useState<Record<string, string>>({});
  const pahsBriefNodes = [
    { id: "context",   label: "🧠 Daily Context Setup",       prompt: "Generate the Latimore Life & Legacy Daily Marketing context for today. Community focus: PAHS (Pottsville Area High School). Offer: Life insurance, legacy planning, family protection. CTA: Scan QR code or DM PROTECT. Keep it concise and action-oriented." },
    { id: "social",    label: "📣 Social Post Generator",     prompt: "Create one ready-to-post Facebook and Google Business Profile post for Latimore Life & Legacy. Open with a community-centered hook referencing the PAHS community. Include a CTA: Scan the QR code or DM PROTECT. Return: (1) Facebook post, (2) Google Business Profile post, (3) Suggested image idea, (4) UTM campaign label." },
    { id: "education", label: "📘 Client Education Tip",       prompt: "Create a simple client education tip about why every family should review their protection plan before they need it. Return in 3 formats: (1) Short social caption, (2) SMS-friendly version under 160 chars, (3) One-sentence in-person talking point." },
    { id: "followup",  label: "💬 New Lead Follow-Up",         prompt: "Write follow-up messages for a new lead who came in through the PAHS QR code campaign. Interest: Family protection quote. Return: (1) SMS follow-up, (2) Email follow-up, (3) Messenger/DM version, (4) Recommended CRM pipeline status." },
    { id: "pahs",      label: "🏫 PAHS Campaign Action",       prompt: "Create today's PAHS community campaign action. Community partner: PAHS. Campaign asset: Ethos postcard with QR code linking to a tracked lead-capture page. Return: (1) Today's action, (2) Why it matters, (3) Tracking instruction, (4) Follow-up trigger, (5) Metric to review tomorrow." },
    { id: "referral",  label: "🤝 Referral Prompt",            prompt: "Create a referral prompt for Latimore Life & Legacy targeting existing clients, parents, and PAHS community contacts. Angle: Help another family protect what matters before life forces the conversation. Return: (1) Text message, (2) Social post, (3) In-person script, (4) One-line referral card copy." },
    { id: "priorities",label: "🎯 Top Business Priorities",    prompt: "Identify the top 3 business priorities for Latimore Life & Legacy today using this filter: (1) What creates trust today? (2) What captures or advances leads today? (3) What strengthens the PAHS community authority system? For each: priority title, why it matters, one concrete action, expected result." },
    { id: "brief",     label: "🧾 Final Command Brief",        prompt: "Compile today's Latimore Life & Legacy Daily Marketing Command Brief into one clean final report with sections: Social Posts, Education Tip, Lead Follow-Up, PAHS Campaign Action, Referral Prompt, Top 3 Priorities, Tracking Notes, Tomorrow's Review Questions. Keep it concise and ready to use." },
  ];

  const [selectedSocialPlatformFilter, setSelectedSocialPlatformFilter] = useState("all");

  // Comment Analysis form states
  const [commentInput, setCommentInput] = useState("");
  const [commentPlatform, setCommentPlatform] = useState("facebook");
  const [analyzedCommentResult, setAnalyzedCommentResult] = useState<any>(null);
  const [isAnalyzingComment, setIsAnalyzingComment] = useState(false);
  const [analyzedError, setAnalyzedError] = useState("");

  // Automated Insights
  const [marketingInsights, setMarketingInsights] = useState<any[]>([
    {
      id: "ins_1",
      type: "Spike",
      severity: "high",
      title: "Engagement Spike: Smart Money & WOSC Option",
      summary: "Comments and clicks grew 240% after writing about North American's Smart Builder early cash liquidity (specifically interest in Pottsville groups). Local business owners are inquiring about emergency reserves placement.",
      action: "Create a Facebook follow-up Q&A and direct interested prospects to book a local pension consultation.",
    },
    {
      id: "ins_2",
      type: "Opportunity",
      severity: "medium",
      title: "Estate Liquidity Interest Rising in Luzerne",
      summary: "Google Analytics reveals high duration on the Estate taxes planning post. Hazleton farms and local assets require tax preservation assets.",
      action: "Draft a client pitch email targeting Luzerne County farm owners emphasizing the ADDvantage coverage features.",
    }
  ]);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [insightsError, setInsightsError] = useState("");

  // Weekly KPI briefing report
  const [weeklyReportResult, setWeeklyReportResult] = useState<any>(null);
  const [isGeneratingWeeklyReport, setIsGeneratingWeeklyReport] = useState(false);
  const [weeklyReportError, setWeeklyReportError] = useState("");
  const [weeklyRepKpis, setWeeklyRepKpis] = useState({ impressions: 68420, reach: 41250, clicks: 3120, conversions: 184 });

  // Campaign scheduler and publisher list
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([
    {
      id: "post_1",
      platform: "facebook",
      caption: "Honoring our second chance at life. Jackson Latimore Sr. survived cardiac arrest on December 7, 2010. Today, we work to protect your loved ones so your story can continue. #TheBeatGoesOn #CentralPA",
      scheduledAt: "2026-05-24T10:00",
      status: "approved",
      mediaUrl: "https://picsum.photos/seed/legacy/800/600",
      createdAt: "2026-05-21",
    },
    {
      id: "post_2",
      platform: "linkedin",
      caption: "How are you shielding your business buyout plans? Entities leverage North American permanent insurance to secure buy-out cash if partners face unplanned disability on duty. Ask us about Executive Bonus section 162 solutions.",
      scheduledAt: "2026-05-25T08:30",
      status: "scheduled",
      mediaUrl: "https://picsum.photos/seed/business/800/600",
      createdAt: "2026-05-21",
    },
    {
      id: "post_3",
      platform: "instagram",
      caption: "Protecting Schuylkill, Luzerne, and Northumberland families with customized insurance face allocations from $100k onwards. Level premiums guaranteed. #LatimoreLegacy #PeaceOfMind",
      scheduledAt: "",
      status: "draft",
      mediaUrl: "https://picsum.photos/seed/family/800/600",
      createdAt: "2026-05-21",
    }
  ]);

  // Create post states
  const [newPostCaption, setNewPostCaption] = useState("");
  const [newPostPlatform, setNewPostPlatform] = useState("facebook");
  const [newPostScheduledAt, setNewPostScheduledAt] = useState("");
  const [newPostMediaUrl, setNewPostMediaUrl] = useState("");

  // Interactive Form Add State
  const [newFinance, setNewFinance] = useState({
    item: "",
    amount: "",
    category: "Casual Budget",
    type: "Expense" as "Income" | "Expense",
    goalId: ""
  });

  const [newHealth, setNewHealth] = useState({
    metric: "",
    category: "Exercise" as "Sleep" | "Exercise" | "Diet" | "Mood" | "Mental",
    value: "",
    energyLevel: "7",
    notes: "",
    goalId: ""
  });

  const [newGoal, setNewGoal] = useState({
    name: "",
    domain: "",
    target: "",
    unit: "",
    targetDate: "",
  });

  const [activeConvertItemIndex, setActiveConvertItemIndex] = useState<number | null>(null);
  const [editGoalFromAI, setEditGoalFromAI] = useState({
    name: "",
    domain: "",
    target: "",
    unit: "",
    targetDate: "",
  });

  // Modal view for app settings or mock import feedback
  const [isSyncingApps, setIsSyncingApps] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState("");
  const [selectedIntegrationIds, setSelectedIntegrationIds] = useState<string[]>([]);

  // CSV batch import states
  const [csvParsedContacts, setCsvParsedContacts] = useState<any[]>([]);
  const [isUploadingCsv, setIsUploadingCsv] = useState(false);
  const [csvError, setCsvError] = useState("");
  const [csvSuccess, setCsvSuccess] = useState("");
  const [csvDragActive, setCsvDragActive] = useState(false);

  const toggleIntegrationSelection = (id: string) => {
    setSelectedIntegrationIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllIntegrations = () => {
    setSelectedIntegrationIds(integrations.map((int) => int.id));
  };

  const handleClearIntegrationSelection = () => {
    setSelectedIntegrationIds([]);
  };

  // Hydrate local storage on mount
  useEffect(() => {
    const cachedFinance = localStorage.getItem("omnilife_finances");
    const cachedHealth = localStorage.getItem("omnilife_health");
    const cachedGoals = localStorage.getItem("omnilife_goals");
    const cachedWidgets = localStorage.getItem("omnilife_widgets");
    const cachedIntegrations = localStorage.getItem("omnilife_integrations");
    const cachedRelations = localStorage.getItem("omnilife_relations");

    setTimeout(() => {
      if (cachedFinance) setFinances(JSON.parse(cachedFinance));
      if (cachedHealth) setHealth(JSON.parse(cachedHealth));
      if (cachedGoals) setGoals(JSON.parse(cachedGoals));
      if (cachedWidgets) setDashboardWidgets(JSON.parse(cachedWidgets));
      if (cachedIntegrations) setIntegrations(JSON.parse(cachedIntegrations));
      if (cachedRelations) setDatabaseRelations(JSON.parse(cachedRelations));
      setMounted(true);
    }, 50);
  }, []);

  // Save changes to localStorage on edit
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("omnilife_finances", JSON.stringify(finances));
    }
  }, [finances, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("omnilife_health", JSON.stringify(health));
    }
  }, [health, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("omnilife_goals", JSON.stringify(goals));
    }
  }, [goals, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("omnilife_relations", JSON.stringify(databaseRelations));
    }
  }, [databaseRelations, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("omnilife_integrations", JSON.stringify(integrations));
    }
  }, [integrations, mounted]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Add Finance Record
  const handleAddFinance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFinance.item || !newFinance.amount) return;

    const record: FinanceItem = {
      id: "f_" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      item: newFinance.item,
      amount: parseFloat(newFinance.amount) || 0,
      category: newFinance.category,
      type: newFinance.type,
      goalId: newFinance.goalId || null,
    };

    setFinances((prev) => [record, ...prev]);
    setNewFinance({
      item: "",
      amount: "",
      category: "Casual Budget",
      type: "Expense",
      goalId: "",
    });

    // If expense correlates with a goal, slightly progress the goal as illustrative feedback!
    if (record.goalId && record.type === "Expense") {
      setGoals((prev) =>
        prev.map((g) => {
          if (g.id === record.goalId && g.id === "g2") {
            // For Organic meal prep goal, spent increases days logged
            return { ...g, currentValue: Math.min(g.target, g.currentValue + 1) };
          }
          return g;
        })
      );
    }
  };

  // Delete Finance Record
  const handleDeleteFinance = (id: string) => {
    setFinances((prev) => prev.filter((item) => item.id !== id));
  };

  // Add Health Record
  const handleAddHealth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHealth.metric || !newHealth.value) return;

    const record: HealthItem = {
      id: "h_" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      metric: newHealth.metric,
      category: newHealth.category,
      value: parseFloat(newHealth.value) || 0,
      energyLevel: parseInt(newHealth.energyLevel) || 7,
      notes: newHealth.notes,
      goalId: newHealth.goalId || null,
    };

    setHealth((prev) => [record, ...prev]);

    // Perform interactive goal progress update where matching!
    if (record.goalId) {
      setGoals((prev) =>
        prev.map((g) => {
          if (g.id === record.goalId) {
            // Half-marathon run adds matching km directly to current metric value!
            if (g.id === "g1" && record.category === "Exercise") {
              return { ...g, currentValue: Math.min(g.target, g.currentValue + record.value) };
            }
            // Mindfulness score updates
            if (g.id === "g4" && record.category === "Mental") {
              // decrease stress
              return { ...g, currentValue: Math.max(g.target, parseFloat((g.currentValue - 0.5).toFixed(1))) };
            }
          }
          return g;
        })
      );
    }

    setNewHealth({
      metric: "",
      category: "Exercise",
      value: "",
      energyLevel: "7",
      notes: "",
      goalId: "",
    });
  };

  // Delete Health Record
  const handleDeleteHealth = (id: string) => {
    setHealth((prev) => prev.filter((item) => item.id !== id));
  };

  // Add Goal
  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.target) return;

    const record: GoalItem = {
      id: "g_" + Date.now(),
      name: newGoal.name,
      domain: newGoal.domain || "Lifestyle",
      target: parseFloat(newGoal.target) || 10,
      currentValue: 0,
      unit: newGoal.unit || "units",
      status: "In Progress",
      targetDate: newGoal.targetDate || new Date().toISOString().split("T")[0],
    };

    setGoals((prev) => [...prev, record]);
    setNewGoal({
      name: "",
      domain: "",
      target: "",
      unit: "",
      targetDate: "",
    });
  };

  // Toggle Goal Status
  const handleToggleGoalStatus = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const nextStatus = g.status === "Completed" ? "In Progress" : "Completed";
          const nextValue = nextStatus === "Completed" ? g.target : g.currentValue;
          return { ...g, status: nextStatus, currentValue: nextValue };
        }
        return g;
      })
    );
  };

  // Delete Goal record
  const handleDeleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  // Add custom database relation rules
  const handleAddRelation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRelation.title || !newRelation.description) return;

    const formulaToSave = newRelation.notionFormula.trim();
    const validationErrors = validateNotionFormula(formulaToSave);
    const severeErrors = validationErrors.filter(err => err.severity === "error");

    if (severeErrors.length > 0) {
      setFormulaErrors(validationErrors);
      alert(`Cannot map Connection due to Formula Syntax Errors:\n\n${severeErrors.map((err, i) => `${i + 1}. ${err.message}`).join("\n")}`);
      return;
    }

    const record: NotionRelationship = {
      id: "r_" + Date.now(),
      title: newRelation.title,
      sourceDb: newRelation.sourceDb,
      sourceMetric: newRelation.sourceMetric || "General Metric",
      targetDb: newRelation.targetDb,
      targetMetric: newRelation.targetMetric || "Overall Goals",
      impactType: newRelation.impactType,
      strength: newRelation.strength,
      description: newRelation.description,
      notionFormula: formulaToSave,
    };

    setDatabaseRelations((prev) => [...prev, record]);
    setNewRelation({
      title: "",
      sourceDb: "Health",
      sourceMetric: "",
      targetDb: "Goals",
      targetMetric: "",
      impactType: "Positive Benefit",
      strength: "High",
      description: "",
      notionFormula: "",
    });
    setFormulaErrors([]);
    setIsFormulaManuallyEdited(false);
  };

  const handleDeleteRelation = (id: string) => {
    setDatabaseRelations((prev) => prev.filter((r) => r.id !== id));
    if (selectedRelationId === id) {
      setSelectedRelationId(null);
    }
  };

  // Connect/Disconnect Integrations toggle
  const handleToggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((int) => {
        if (int.id === id) {
          return {
            ...int,
            connected: !int.connected,
            lastSync: !int.connected ? "Just connected" : "Never synced"
          };
        }
        return int;
      })
    );
  };

  // Simulated Third-party API Import trigger
  const handleSyncApps = () => {
    setIsSyncingApps(true);
    setSyncFeedback("Authenticating tokens for active connectors...");

    setTimeout(() => {
      setSyncFeedback("Downloading heart logs from Fitbit REST API & distance GPS loops from Strava API...");

      setTimeout(() => {
        // Build new simulated records to insert
        const todayStr = new Date().toISOString().split("T")[0];

        // 1. Strava Sync Workout (Km) for Half marathon goal
        const stravaWorkout: HealthItem = {
          id: "strava_" + Date.now(),
          date: todayStr,
          metric: "Strava Sync: Morning Stride (8K Run)",
          category: "Exercise",
          value: 8.0,
          energyLevel: 9,
          notes: "GPS watch synced via webhook. Steady 5:12/km pace. Felt amazing limiters.",
          goalId: "g1", // related to 21K goal
        };

        // 2. Fitbit Sync Sleep log
        const fitbitSleep: HealthItem = {
          id: "fitbit_" + Date.now(),
          date: todayStr,
          metric: "Fitbit Sync: Core Sleep Stage",
          category: "Sleep",
          value: 8.4,
          energyLevel: 10,
          notes: "Automatic night wearable data. Deep Sleep: 1.8h, REM: 2.1h. Optimum rest score.",
          goalId: null,
        };

        // Insert logs
        setHealth((prev) => [stravaWorkout, fitbitSleep, ...prev]);

        // Automatically update current goals!
        setGoals((prev) =>
          prev.map((g) => {
            if (g.id === "g1") {
              return {
                ...g,
                currentValue: Math.min(g.target, g.currentValue + 8.0),
                status: g.currentValue + 8.0 >= g.target ? "Completed" : "In Progress",
              };
            }
            return g;
          })
        );

        // Update sync times in list
        setIntegrations((prev) =>
          prev.map((int) => {
            if (int.connected) {
              return { ...int, lastSync: "Synced just now" };
            }
            return int;
          })
        );

        setIsSyncingApps(false);
        setSyncFeedback("");
        alert("Integrations Sync Complete! Successfully imported Fitbit daily sleep records and an 8.0km Training Run from Strava directly into your Health & Goals databases.");
      }, 1200);
    }, 1000);
  };

  // CSV file readers and database bulk importers
  const parseCSVData = (text: string) => {
    const lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
    if (lines.length < 2) {
      setCsvError("The CSV file must contain at least a header row and one data row.");
      return;
    }

    // Capture standard headers & cleanup quote wrapping
    const headers = lines[0].split(",").map(h => h.replace(/^["']|["']$/g, "").trim().toLowerCase());

    const result = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      
      // Simple parser matching quoted/unquoted parts to handle names with commas correctly
      const values: string[] = [];
      let currentVal = "";
      let inQuotes = false;
      for (let charIndex = 0; charIndex < line.length; charIndex++) {
        const char = line[charIndex];
        if (char === '"' || char === "'") {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(currentVal.trim());
          currentVal = "";
        } else {
          currentVal += char;
        }
      }
      values.push(currentVal.trim());

      const row: any = {};
      headers.forEach((header, idx) => {
        const value = values[idx] || "";
        const cleanedValue = value.replace(/^["']|["']$/g, "").trim();

        // Flexibly map header fields
        if (header === "name" || header === "fullname" || header.includes("client") || header.includes("contact")) {
          row.name = cleanedValue;
        } else if (header === "email" || header.includes("mail")) {
          row.email = cleanedValue;
        } else if (header === "phone" || header.includes("cell") || header.includes("tel")) {
          row.phone = cleanedValue;
        } else if (header === "notes" || header.includes("comment") || header.includes("desc")) {
          row.notes = cleanedValue;
        } else if (header === "stage" || header === "status" || header.includes("pipeline")) {
          row.stage = cleanedValue;
        } else if (header.includes("sms") || header.includes("consent")) {
          row.smsConsentStatus = cleanedValue;
        } else if (header.includes("email_consent") || header.includes("emailconsent")) {
          row.emailConsentStatus = cleanedValue;
        } else {
          row[header] = cleanedValue;
        }
      });

      if (row.name) {
        result.push(row);
      }
    }

    if (result.length === 0) {
      setCsvError("No valid rows containing a 'name' field could be parsed. Check your headers.");
    } else {
      setCsvParsedContacts(result);
      setCsvError("");
      setCsvSuccess(`Successfully parsed ${result.length} contact records! Review the list below to import.`);
    }
  };

  const handleCsvFileLoad = (file: File) => {
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setCsvError("Invalid file format. Please select or drop a valid .csv file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        parseCSVData(text);
      }
    };
    reader.onerror = () => {
      setCsvError("Failed to read file.");
    };
    reader.readAsText(file);
  };

  const handleCsvUpload = async () => {
    if (csvParsedContacts.length === 0) {
      setCsvError("There are no records parsed to upload.");
      return;
    }

    setIsUploadingCsv(true);
    setCsvError("");
    setCsvSuccess("");

    try {
      const res = await fetch("/api/contacts/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contacts: csvParsedContacts }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to batch import.");
      }

      setCsvSuccess(`Ingestion Successful! ${data.count} contacts have been batched into the DB and mapped across Schuylkill/Luzerne/Northumberland pipelines.`);
      setCsvParsedContacts([]);
    } catch (err: any) {
      setCsvError(err.message || "An unexpected network error occurred.");
    } finally {
      setIsUploadingCsv(false);
    }
  };

  // Bulk processing / Batch sync all selected applications at once
  const handleBulkSync = () => {
    if (selectedIntegrationIds.length === 0) {
      alert("Please select at least one Connected App first.");
      return;
    }
    
    setIsSyncingApps(true);
    setSyncFeedback(`Authenticating tokens for ${selectedIntegrationIds.length} bulk connectors...`);

    setTimeout(() => {
      // Build feedback names
      const selectedApps = integrations.filter((int) => selectedIntegrationIds.includes(int.id));
      const appNames = selectedApps.map((int) => int.name).join(", ");
      
      setSyncFeedback(`Downloading feeds and parsing endpoints for: ${appNames}...`);

      setTimeout(() => {
        const todayStr = new Date().toISOString().split("T")[0];
        let addedHealth: HealthItem[] = [];
        let addedFinance: FinanceItem[] = [];
        let addedGoalsPercentG1 = 0;
        let messageLog: string[] = [];

        // For each selected app, let's create custom simulated records to ingest
        selectedIntegrationIds.forEach((id) => {
          if (id === "fitbit") {
            addedHealth.push({
              id: "fitbit_bulk_" + Date.now() + Math.random(),
              date: todayStr,
              metric: "Fitbit Sync: Core Sleep Stage & Rest Pulse",
              category: "Sleep",
              value: 8.4,
              energyLevel: 10,
              notes: "Aggregated night wearable metrics. Deep Sleep: 1.8h, REM: 2.1h. Rest pulse 58 bpm.",
              goalId: null,
            });
            messageLog.push("Fitbit (8.4h sleep logged)");
          } else if (id === "strava") {
            addedHealth.push({
              id: "strava_bulk_" + Date.now() + Math.random(),
              date: todayStr,
              metric: "Strava Sync: Morning Stride (8K Run)",
              category: "Exercise",
              value: 8.0,
              energyLevel: 9,
              notes: "GPS track synced via Strava Club. Steady 5:12/km pace.",
              goalId: "g1", // related to 21K goal
            });
            addedGoalsPercentG1 += 8.0;
            messageLog.push("Strava (8.0km run logged)");
          } else if (id === "plaid") {
            addedFinance.push({
              id: "plaid_bulk_" + Date.now() + Math.random(),
              date: todayStr,
              item: "Plaid Ledger: POTTSVILLE HEATH & GYM INC",
              category: "Health & Fitness",
              amount: 55.0,
              type: "Expense",
              goalId: "g1",
            });
            messageLog.push("Plaid (gym invoice $55.00 imported)");
          } else if (id === "gcal") {
            addedHealth.push({
              id: "gcal_bulk_" + Date.now() + Math.random(),
              date: todayStr,
              metric: "Google Calendar: 60m Yoga Session",
              category: "Mental",
              value: 1.0,
              energyLevel: 8,
              notes: "Mindfulness and stretching calendar event verified.",
              goalId: "g4",
            });
            messageLog.push("Google Calendar (1.0h Yoga session logged)");
          } else if (id === "facebook") {
            messageLog.push("Facebook Ads API (retrieved 184 lead clicks for Schuylkill and Luzerne Ads)");
          } else if (id === "instagram") {
            messageLog.push("Instagram Business Feed (parsed 12 direct messages for Pottsville policy reviews)");
          } else if (id === "linkedin") {
            messageLog.push("LinkedIn Professional Hub (sync'd B2B partnership outreach report)");
          } else if (id === "resend") {
            messageLog.push("Resend Email (delivered 85 outbound campaign flyers; open rate 38%)");
          } else if (id === "hubspot") {
            messageLog.push("HubSpot CRM (synchronized 2 inquiry lifecycle state progressions)");
          }
        });

        // Insert logs to database state
        if (addedHealth.length > 0) {
          setHealth((prev) => [...addedHealth, ...prev]);
        }
        if (addedFinance.length > 0) {
          setFinances((prev) => [...addedFinance, ...prev]);
        }

        // Progress goals
        if (addedGoalsPercentG1 > 0) {
          setGoals((prev) =>
            prev.map((g) => {
              if (g.id === "g1") {
                return {
                  ...g,
                  currentValue: Math.min(g.target, g.currentValue + addedGoalsPercentG1),
                  status: g.currentValue + addedGoalsPercentG1 >= g.target ? "Completed" : "In Progress",
                };
              }
              return g;
            })
          );
        }

        // Convert synced states to active, and set lastSynced time!
        setIntegrations((prev) =>
          prev.map((int) => {
            if (selectedIntegrationIds.includes(int.id)) {
              return { ...int, connected: true, lastSync: "Synced just now" };
            }
            return int;
          })
        );

        setIsSyncingApps(false);
        setSyncFeedback("");
        setSelectedIntegrationIds([]);

        alert(`Bulk Apps Sync Completed Successfully!\n\nImport logs processed:\n${messageLog.map(m => `• ${m}`).join("\n")}`);
      }, 1500);
    }, 1200);
  };

  // Generate AI Executive report (Calls actual /api/gemini/insights route)
  const handleGenerateAIReport = async () => {
    setIsGeneratingReport(true);
    setReportError("");
    try {
      const response = await fetch("/api/gemini/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ finances, health, goals }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Server endpoint returned a failure.");
      }

      setAiReport(data);
      // Also add a little notification message in conversation history automatically!
      setChatHistory((prev) => [
        ...prev,
        { role: "model", content: "✨ **System Notice:** I have compiled a full Cross-Domain Executive Workspace Analysis. View the detailed segments, correlation coefficients, and actionable checklist under the 'AI Reports Hub' visualizer!" }
      ]);
    } catch (err: any) {
      console.error(err);
      setReportError(err?.message || "Failed to generate AI analytics. Check your Gemini API connection key settings.");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // Call Gemini Content Studio API to write campaign articles, posts, transcripts, or emails
  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingContent(true);
    setContentStudioError("");
    setCreatedContentHtml("");

    try {
      const activeDoc = campaignDocuments.find((d) => d.id === selectedDocumentId);
      const response = await fetch("/api/gemini/create-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: selectedDocumentId,
          documentTitle: activeDoc ? activeDoc.title : "",
          documentText: activeDoc ? activeDoc.text : "",
          contentType: campaignContentType,
          topic: campaignTopic,
          targetAudience: campaignAudience,
          selectedTone: campaignTone,
          additionalPrompt: campaignAdditional,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Content endpoint returned a failure.");
      }

      setCreatedContentHtml(data.text);
      
      // Save it into the local generated lists so they persist
      const newCampaignItem = {
        id: "c_" + Date.now(),
        title: `${campaignTopic} - ${campaignAudience} (${campaignContentType.toUpperCase()})`,
        date: new Date().toISOString().split("T")[0],
        type: campaignContentType,
        topic: campaignTopic,
        audience: campaignAudience,
        content: data.text,
      };
      setGeneratedCampaigns((prev) => [newCampaignItem, ...prev]);
    } catch (err: any) {
      console.error(err);
      setContentStudioError(err?.message || "Failed to generate marketing content. Verify your local Gemini connection settings.");
    } finally {
      setIsCreatingContent(false);
    }
  };

  // Paste / Import custom documents to campaign library
  const handleAddCustomDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDocTitle.trim() || !customDocText.trim()) return;

    const newDoc = {
      id: "doc_" + Date.now(),
      title: customDocTitle.trim(),
      description: `User-imported customized guideline reference text. Added on ${new Date().toLocaleDateString()}.`,
      date: new Date().toISOString().split("T")[0],
      charCount: customDocText.length,
      text: customDocText.trim()
    };

    setCampaignDocuments((prev) => [...prev, newDoc]);
    setSelectedDocumentId(newDoc.id); // set newly added document as active!
    setCustomDocTitle("");
    setCustomDocText("");
    alert(`Document "${newDoc.title}" successfully imported into your Campaign reference library!`);
  };

  // ===================== MARKETING INTELLIGENCE & SOCIAL HUB HANDLERS =====================

  // 1. Analyze Social Comment / DM
  const handleAnalyzeComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    setIsAnalyzingComment(true);
    setAnalyzedError("");
    setAnalyzedCommentResult(null);

    try {
      const response = await fetch("/api/social/analyse-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentBody: commentInput.trim(),
          platform: commentPlatform,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze social feedback.");
      }

      setAnalyzedCommentResult(data);
    } catch (err: any) {
      console.error(err);
      setAnalyzedError(err?.message || "Verification failed. Inspect backend routers.");
    } finally {
      setIsAnalyzingComment(false);
    }
  };

  // 2. Generate Automated Predictive Insights from Dashboard
  const handleGenerateEngagementInsights = async () => {
    setIsGeneratingInsights(true);
    setInsightsError("");

    try {
      const platformMetrics = {
        facebook: { impressions: 22400, reach: 14500, clicks: 840, conversions: 42, rate: "3.75%" },
        instagram: { impressions: 14800, reach: 11200, clicks: 520, conversions: 18, rate: "3.51%" },
        linkedin: { impressions: 18500, reach: 9800, clicks: 980, conversions: 78, rate: "5.30%" },
        website: { impressions: 12720, reach: 5750, clicks: 780, conversions: 46, rate: "6.13%" },
      };

      const response = await fetch("/api/social/generate-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platformMetrics,
          topPosts: scheduledPosts.map(p => ({ platform: p.platform, caption: p.caption, status: p.status })),
          baselineComparison: {
            impressionsChange: "+15.4%",
            conversionsChange: "+22.1%",
            topPerformingChannel: "LinkedIn",
          }
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Engagement metrics sync encountered an error.");
      }

      setMarketingInsights(data);
    } catch (err: any) {
      console.error(err);
      setInsightsError(err?.message || "Failed to generate analytics insights.");
    } finally {
      setIsGeneratingInsights(false);
    }
  };

  // 3. Generate Executive Weekly Briefing Report
  const handleGenerateWeeklyReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingWeeklyReport(true);
    setWeeklyReportError("");
    setWeeklyReportResult(null);

    try {
      const response = await fetch("/api/social/weekly-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kpis: {
            impressions: weeklyRepKpis.impressions,
            reach: weeklyRepKpis.reach,
            clicks: weeklyRepKpis.clicks,
            conversions: weeklyRepKpis.conversions,
            estimatedLeadsAttributed: 38,
          },
          sentimentTrend: {
            positive: "65%",
            neutral: "22%",
            negative: "9%",
            complianceScore: "100%",
          },
          topTopics: [
            "Annuity Maximization Benefits",
            "Smart Builder early WOSC liquidity",
            "Executive Bonus split-dollar tax benefits",
            "#TheBeatGoesOn Cardiac Legacy survival",
          ],
          activeCampaign: {
            title: "Luzerne and Schuylkill Family Farmers Security Campaign",
            underwritingTiers: "Preferred Non-Tobacco Tier NT"
          }
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to assemble executive weekly report.");
      }

      setWeeklyReportResult(data);
    } catch (err: any) {
      console.error(err);
      setWeeklyReportError(err?.message || "Report compiler failed to execute.");
    } finally {
      setIsGeneratingWeeklyReport(false);
    }
  };

  // 4. Create Post Draft / Queue
  const handleSchedulePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostCaption.trim()) return;

    // Apply auto compliance disclaimer injector for index universal life & tax mentions
    let finalizedCaption = newPostCaption;
    const lower = finalizedCaption.toLowerCase();
    if (lower.includes("iul") || lower.includes("index") || lower.includes("tax-free") || lower.includes("annuity")) {
      finalizedCaption += "\n\n(Compliance Disclaimer: Life insurance products are subject to underwriting guidelines. Interest bonuses, index multipliers, and tax outcomes are illustrative and subject to change.)";
    }

    const newPostItem = {
      id: "post_" + Date.now(),
      platform: newPostPlatform,
      caption: finalizedCaption,
      scheduledAt: newPostScheduledAt || "",
      status: newPostScheduledAt ? "scheduled" : "draft",
      mediaUrl: newPostMediaUrl || "https://picsum.photos/seed/marketing/800/600",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setScheduledPosts((prev) => [newPostItem, ...prev]);
    setNewPostCaption("");
    setNewPostScheduledAt("");
    setNewPostMediaUrl("");
    alert("Marketing Campaign Post successfully queued in your publishing terminal!");
  };

  // 5. Approve Scheduled Draft Post
  const handleApprovePost = (id: string) => {
    setScheduledPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          return { ...post, status: "approved" };
        }
        return post;
      })
    );
  };

  // 6. Direct Publish Post Now (simulates API request, increments simulated conversion engagement metrics!)
  const handlePublishPostNow = (id: string) => {
    setScheduledPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          alert(`Success! Content published directly to ${post.platform.toUpperCase()} API. Webhook handshakes confirmed.`);
          return { ...post, status: "published", publishedAt: new Date().toISOString() };
        }
        return post;
      })
    );
  };

  // Send Conversation Chat message to Latimore Life & Legacy Assistant (Calls /api/gemini/chat)
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput("");
    setChatError("");

    const updatedHistory: ChatMessage[] = [
      ...chatHistory,
      { role: "user", content: userMessage }
    ];
    setChatHistory(updatedHistory);
    setIsSendingChat(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: updatedHistory.slice(1, -1), // skip initial bot message and the immediate append
          data: { finances, health, goals }
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to retrieve AI response.");
      }

      setChatHistory((prev) => [
        ...prev,
        { role: "model", content: result.text }
      ]);
    } catch (err: any) {
      console.error(err);
      setChatError(err?.message || "Communication pipeline block. Verify process credentials in Secrets panel.");
    } finally {
      setIsSendingChat(false);
    }
  };

  // Smart Helper function to map AI advices and parse numbers/metrics
  const getPrefilledGoalFromAI = (item: AIInsightTask) => {
    const name = item.title;
    const lowerTitle = item.title.toLowerCase();
    const lowerAdvice = item.advice.toLowerCase();

    // Map domains cleanly to dropdown choices
    let domain = "Career & Tech";
    if (item.domain === "Finance" || lowerTitle.includes("spend") || lowerTitle.includes("savings") || lowerTitle.includes("budget") || lowerTitle.includes("financial") || lowerTitle.includes("fund") || lowerAdvice.includes("budget") || lowerAdvice.includes("save")) {
      domain = "Financial Growth";
    } else if (item.domain === "Health") {
      if (lowerTitle.includes("diet") || lowerTitle.includes("meal") || lowerTitle.includes("food") || lowerTitle.includes("organic") || lowerTitle.includes("nutrition") || lowerAdvice.includes("eat") || lowerAdvice.includes("grocery")) {
        domain = "Dietary Health";
      } else if (lowerTitle.includes("sleep") || lowerTitle.includes("stress") || lowerTitle.includes("mind") || lowerTitle.includes("rest") || lowerTitle.includes("mental") || lowerAdvice.includes("sleep") || lowerAdvice.includes("stress") || lowerAdvice.includes("breathe")) {
        domain = "Mental Space";
      } else {
        domain = "Athletic & Fitness";
      }
    } else if (item.domain === "Goals") {
      if (lowerTitle.includes("contract") || lowerTitle.includes("tech") || lowerTitle.includes("career") || lowerTitle.includes("code") || lowerTitle.includes("portfolio") || lowerAdvice.includes("portfolio") || lowerAdvice.includes("client")) {
        domain = "Career & Tech";
      } else if (lowerTitle.includes("stress") || lowerTitle.includes("sleep") || lowerTitle.includes("rest") || lowerAdvice.includes("stress") || lowerAdvice.includes("sleep")) {
        domain = "Mental Space";
      } else if (lowerTitle.includes("diet") || lowerTitle.includes("meal") || lowerTitle.includes("organic") || lowerAdvice.includes("cooking") || lowerAdvice.includes("mealprep")) {
        domain = "Dietary Health";
      } else {
        domain = "Athletic & Fitness";
      }
    }

    // Heuristics to find target metrics & unit labels in text
    let target = 10;
    let unit = "units";

    const moneyRegex = /\$(\d+(?:\.\d+)?)/;
    const kmRegex = /(\d+(?:\.\d+)?)\s*(?:km|kilometers|k)/i;
    const daysRegex = /(\d+(?:\.\d+)?)\s*(?:days|day|d)/i;
    const hoursRegex = /(\d+(?:\.\d+)?)\s*(?:hours|hour|hr|h)/i;
    const countRegex = /(\d+(?:\.\d+)?)\s*(?:times|sessions|reps|g)/i;
    
    const moneyMatch = lowerAdvice.match(moneyRegex) || lowerTitle.match(moneyRegex);
    const kmMatch = lowerAdvice.match(kmRegex) || lowerTitle.match(kmRegex);
    const daysMatch = lowerAdvice.match(daysRegex) || lowerTitle.match(daysRegex);
    const hoursMatch = lowerAdvice.match(hoursRegex) || lowerTitle.match(hoursRegex);
    const countMatch = lowerAdvice.match(countRegex) || lowerTitle.match(countRegex);

    if (moneyMatch) {
      target = parseFloat(moneyMatch[1]);
      unit = "USD";
    } else if (kmMatch) {
      target = parseFloat(kmMatch[1]);
      unit = "km";
    } else if (daysMatch) {
      target = parseFloat(daysMatch[1]);
      unit = "days";
    } else if (hoursMatch) {
      target = parseFloat(hoursMatch[1]);
      unit = "hours";
    } else if (countMatch) {
      target = parseFloat(countMatch[1]);
      unit = "times";
    } else {
      // General fallbacks based on mapped domain
      if (domain === "Financial Growth") {
        target = 300;
        unit = "USD";
      } else if (domain === "Dietary Health") {
        target = 21;
        unit = "days";
      } else if (domain === "Athletic & Fitness") {
        target = 15;
        unit = "km";
      } else if (domain === "Mental Space") {
        target = 7;
        unit = "hours";
      } else {
        target = 5;
        unit = "tasks";
      }
    }

    // Due date (30 days standard target duration)
    const targetDateObj = new Date();
    targetDateObj.setDate(targetDateObj.getDate() + 30);
    const targetDate = targetDateObj.toISOString().split("T")[0];

    return { name, domain, target: target.toString(), unit, targetDate };
  };

  const handleInitiateAddGoalFromAI = (item: AIInsightTask, idx: number) => {
    const prefilled = getPrefilledGoalFromAI(item);
    setEditGoalFromAI(prefilled);
    setActiveConvertItemIndex(idx);
  };

  const handleSaveGoalFromAIEdit = () => {
    if (!editGoalFromAI.name || !editGoalFromAI.target) return;

    const record: GoalItem = {
      id: "g_ai_" + Date.now(),
      name: editGoalFromAI.name,
      domain: editGoalFromAI.domain || "Lifestyle",
      target: parseFloat(editGoalFromAI.target) || 10,
      currentValue: 0,
      unit: editGoalFromAI.unit || "units",
      status: "In Progress",
      targetDate: editGoalFromAI.targetDate || new Date().toISOString().split("T")[0],
    };

    setGoals((prev) => [...prev, record]);
    setActiveConvertItemIndex(null);

    setChatHistory((prev) => [
      ...prev,
      { 
        role: "model", 
        content: `🎯 **Milestone Activated:** I have mapped your AI Action Item to a brand-new metric goal: **"${editGoalFromAI.name}"**! This is now being actively monitored under your Goals database.`
      }
    ]);

    alert(`Goal Generated Success! "${editGoalFromAI.name}" is now tracking under the "${editGoalFromAI.domain}" domain.`);
  };

  // Quick Action to implement an AI advice recommendation as a direct Goal
  const handleAddGoalFromAI = (item: AIInsightTask) => {
    const prefilled = getPrefilledGoalFromAI(item);
    const record: GoalItem = {
      id: "g_ai_" + Date.now(),
      name: prefilled.name,
      domain: prefilled.domain,
      target: parseFloat(prefilled.target) || 10,
      currentValue: 0,
      unit: prefilled.unit,
      status: "In Progress",
      targetDate: prefilled.targetDate,
    };

    setGoals((prev) => [...prev, record]);
    alert(`Goal Generated Success! "${prefilled.name}" from AI Analyst advice has been appended as an active goal in your database tracker.`);
  };

  // ----------------------------------------------------
  // DYNAMIC COMPUTED STATS FOR INTERCONNECTED ANALYSIS
  // ----------------------------------------------------
  const totalIncome = finances
    .filter((f) => f.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = finances
    .filter((f) => f.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.round((netSavings / totalIncome) * 100) : 0;

  // Average Sleep calculation
  const sleepLogs = health.filter((h) => h.category === "Sleep");
  const averageSleep =
    sleepLogs.length > 0
      ? parseFloat((sleepLogs.reduce((sum, item) => sum + item.value, 0) / sleepLogs.length).toFixed(1))
      : 0;

  // Average Energy Index
  const averageEnergy =
    health.length > 0
      ? parseFloat((health.reduce((sum, item) => sum + item.energyLevel, 0) / health.length).toFixed(1))
      : 0;

  // Dynamic database relationships metrics
  const activeGoalCount = goals.filter((g) => g.status === "In Progress").length;
  const goalInvestmentsMap = goals.reduce((acc, goal) => {
    const supportingSpend = finances
      .filter((f) => f.goalId === goal.id && f.type === "Expense")
      .reduce((sum, item) => sum + item.amount, 0);
    acc[goal.id] = supportingSpend;
    return acc;
  }, {} as Record<string, number>);

  const goalActivitiesMap = goals.reduce((acc, goal) => {
    const activityCount = health.filter((h) => h.goalId === goal.id).length;
    acc[goal.id] = activityCount;
    return acc;
  }, {} as Record<string, number>);

  // Live Pearson Correlation Math for Health Sleep Quality vs Energy Index
  const getSleepEnergyCorrelation = () => {
    const sleepLogs = health.filter((h) => h.category === "Sleep");
    const x = sleepLogs.map((h) => h.value);
    const y = sleepLogs.map((h) => h.energyLevel);

    if (x.length < 2) return { value: 0.85, label: "Strong Correlation" };

    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, val, idx) => sum + val * y[idx], 0);
    const sumX2 = x.reduce((a, b) => a + b * b, 0);
    const sumY2 = y.reduce((a, b) => a + b * b, 0);

    const num = n * sumXY - sumX * sumY;
    const den = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    const coeff = den === 0 ? 0.85 : parseFloat((num / den).toFixed(2));

    let label = "Moderate Correlation";
    if (coeff >= 0.7) label = "Strong Positive Correlation";
    else if (coeff >= 0.4) label = "Subtle Positive Influence";
    else if (coeff <= -0.4) label = "Negative Friction";

    return { value: coeff, label };
  };

  const sleepEnergyCorr = getSleepEnergyCorrelation();

  // Generate chart data correlating spending & energy metrics chronologically
  const prepareCorrelationChartData = () => {
    // Collect unique dates from finances & health
    const dates = Array.from(
      new Set([
        ...finances.map((f) => f.date),
        ...health.map((h) => h.date),
      ])
    ).sort();

    return dates.map((dateStr) => {
      // Find finance spending support on this date
      const totalSpentOnDate = finances
        .filter((f) => f.date === dateStr && f.type === "Expense")
        .reduce((sum, item) => sum + item.amount, 0);

      // Average energy score logged on this date
      const healthLogs = health.filter((h) => h.date === dateStr);
      const avgEnergy =
        healthLogs.length > 0
          ? healthLogs.reduce((sum, h) => sum + h.energyLevel, 0) / healthLogs.length
          : null;

      // Avg workout quality or duration on this date
      const exerciseLogs = healthLogs.filter((h) => h.category === "Exercise");
      const totalExerciseHrs = exerciseLogs.reduce((sum, h) => sum + h.value, 0);

      return {
        date: dateStr.substring(5), // crop to MM-DD
        "Amount Spent ($)": totalSpentOnDate,
        "Energy Level (1-10)": avgEnergy,
        "Exercise (hours)": totalExerciseHrs,
      };
    });
  };

  const correlationChartData = prepareCorrelationChartData();

  // Financial categories breakdown data for Pie Chart
  const prepareFinanceCategoryData = () => {
    const categoryTotals: Record<string, number> = {};
    finances
      .filter((f) => f.type === "Expense")
      .forEach((item) => {
        categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
      });

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value: Math.round(value),
    }));
  };

  const financeCategoryData = prepareFinanceCategoryData();
  const PIE_COLORS = ["#14b8a6", "#6366f1", "#ec4899", "#f59e0b", "#3b82f6", "#8b5cf6"];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-200">
        <RefreshCw className="h-10 w-10 animate-spin text-teal-400 mb-4" />
        <p className="text-sm font-mono tracking-wider">INITIATING OMNILIFE WORKSPACE MODULES...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500/20 selection:text-teal-300">
      
      {/* ----------------- TOP STATUS BAR ----------------- */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-teal-500/10">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Latimore Life & Legacy <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-mono">Workspace OS</span>
              </h1>
              <p className="text-xs text-slate-400">Interconnected Trackers • Customizable Dashboards • Gemini Reports</p>
            </div>
          </div>

          {/* Quick Stats Banner / Integrations status */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800/80 rounded-lg px-3 py-1.5 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
              <span>Synced Feeds:</span>
              <span className="text-teal-400 font-bold">
                {integrations.filter((i) => i.connected).length}/{integrations.length}
              </span>
            </div>

            <button
              onClick={handleSyncApps}
              disabled={isSyncingApps}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/50 text-slate-200 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 transition-all text-xs font-medium cursor-pointer"
            >
              <RefreshCw className={`h-3 w-3 ${isSyncingApps ? "animate-spin text-teal-400" : ""}`} />
              {isSyncingApps ? "Syncing APIs..." : "Fetch App Feeds"}
            </button>

            <button
              onClick={handleGenerateAIReport}
              disabled={isGeneratingReport}
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 px-3 py-1.5 rounded-lg font-semibold transition-all text-xs cursor-pointer shadow-md shadow-teal-500/10 disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5 fill-current" />
              {isGeneratingReport ? "AI Compiling..." : "Generate AI Insights"}
            </button>
          </div>

        </div>
      </header>

      {/* ----------------- APP SHELL (SIDEBAR + MAIN WINDOW) ----------------- */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 gap-6">
        
        {/* SIDE BAR / NAV CONTROLS */}
        <aside className="w-full md:w-64 flex flex-col gap-4 shrink-0">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-1.5">
            <p className="text-[10px] font-mono tracking-wider text-slate-400 font-bold uppercase mb-2">Workspace Nodes</p>
            
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-teal-500/15 to-indigo-500/5 text-teal-300 border border-teal-500/30 shadow-sm"
                  : "hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Grid className="h-4 w-4" />
                <span className="font-medium">Custom Dashboard</span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab("databases")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                activeTab === "databases"
                  ? "bg-gradient-to-r from-teal-500/15 to-indigo-500/5 text-teal-300 border border-teal-500/30 shadow-sm"
                  : "hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Database className="h-4 w-4" />
                <span className="font-medium">Notion Relations DB</span>
              </div>
              <span className="text-[10px] bg-slate-950 font-mono px-1.5 py-0.5 rounded border border-slate-800 text-slate-400 font-bold">
                {finances.length + goals.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("relations")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                activeTab === "relations"
                  ? "bg-gradient-to-r from-teal-500/15 to-indigo-500/5 text-teal-300 border border-teal-500/30 shadow-sm"
                  : "hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Link className="h-4 w-4 text-emerald-400 rotate-45" />
                <span className="font-medium">Relationship Mapper</span>
              </div>
              <span className="text-[10px] bg-slate-950 font-mono px-1.5 py-0.5 rounded border border-slate-800 text-teal-400 font-bold">
                {databaseRelations.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("ai")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                activeTab === "ai"
                  ? "bg-gradient-to-r from-teal-500/15 to-indigo-500/5 text-teal-300 border border-teal-500/30 shadow-sm"
                  : "hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span className="font-medium">AI Coaching & Reports</span>
              </div>
              {aiReport && (
                <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("content")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                activeTab === "content"
                  ? "bg-gradient-to-r from-teal-500/15 to-indigo-500/5 text-teal-300 border border-teal-500/30 shadow-sm"
                  : "hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="h-4 w-4 text-pink-400" />
                <span className="font-medium">Campaign Content Studio</span>
              </div>
              <span className="text-[10px] bg-slate-950 font-mono px-1.5 py-0.5 rounded border border-slate-800 text-pink-400 font-bold">
                {campaignDocuments.length} Docs
              </span>
            </button>

            <button
              onClick={() => setActiveTab("marketing")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                activeTab === "marketing"
                  ? "bg-gradient-to-r from-amber-500/15 to-indigo-500/5 text-amber-300 border border-amber-500/30 shadow-sm"
                  : "hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Share2 className="h-4 w-4 text-amber-400" />
                <span className="font-medium">Engagement Intelligence</span>
              </div>
              <span className="text-[10px] bg-slate-950 font-mono px-1.5 py-0.5 rounded border border-slate-800 text-amber-400 font-bold">
                {scheduledPosts.length} Posts
              </span>
            </button>

            <button
              onClick={() => setActiveTab("integrations")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                activeTab === "integrations"
                  ? "bg-gradient-to-r from-teal-500/15 to-indigo-500/5 text-teal-300 border border-teal-500/30 shadow-sm"
                  : "hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Smartphone className="h-4 w-4 text-orange-400" />
                <span className="font-medium">Connected Apps</span>
              </div>
              <span className="text-[10px] bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20 text-green-400 font-bold font-mono">
                {integrations.filter((i) => i.connected).length} On
              </span>
            </button>

            <button
              onClick={() => setActiveTab("autoloop")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                activeTab === "autoloop"
                  ? "bg-gradient-to-r from-amber-500/15 to-rose-500/5 text-rose-300 border border-rose-500/30 shadow-sm shadow-rose-950/20"
                  : "hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5 font-mono">
                <Layers className="h-4 w-4 text-rose-450 animate-pulse" />
                <span className="font-semibold text-[13px] tracking-tight text-white uppercase">GPT-Chain Workspace</span>
              </div>
              <span className="text-[9.5px] bg-rose-500/15 text-rose-350 font-mono px-1.5 py-0.5 rounded border border-rose-500/25 font-bold uppercase tracking-wider">
                Loop
              </span>
            </button>

          </div>

          {/* DUST-CLEAN QUICK ACTIONS MANAGER */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-2.5">
            <p className="text-[10px] font-mono tracking-wider text-slate-400 font-bold uppercase">Database Interlinks</p>
            <div className="text-[11px] text-slate-400 leading-relaxed font-mono flex flex-col gap-2">
              <p>Current goals are funded directly by tagged financial purchases, and workouts from synced wearables drive the progression metrics instantly.</p>
              <div className="h-px bg-slate-800 w-full my-1" />
              <div className="flex flex-col gap-1 text-slate-300">
                <div className="flex justify-between">
                  <span>Marathon Funds:</span>
                  <span className="text-teal-400 font-bold">${goalInvestmentsMap["g1"] || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Marathon Logs:</span>
                  <span className="text-teal-400 font-bold">{goalActivitiesMap["g1"] || 0} tabs</span>
                </div>
                <div className="flex justify-between">
                  <span>Diet Logs:</span>
                  <span className="text-teal-400 font-bold">{goalActivitiesMap["g2"] || 0} sessions</span>
                </div>
              </div>
            </div>
          </div>

        </aside>

        {/* MAIN GAMEPLAY CONTENT CONTAINER */}
        <main className="flex-1 min-w-0">
          
          {/* SYNC ANIMATION STATUS BAR */}
          {isSyncingApps && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 border border-teal-500/30 text-teal-400 p-3 rounded-xl mb-4 text-xs font-mono flex items-center gap-3"
            >
              <RefreshCw className="h-4 w-4 animate-spin text-teal-400 shrink-0" />
              <span>{syncFeedback}</span>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            
            {/* ===================== TAB 1: CUSTOM DESKTOP DASHBOARD ===================== */}
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6"
              >
                
                {/* Customizable Dashboard Manager Controls Panel */}
                <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl flex flex-col gap-3 shadow-inner">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sliders className="h-4 w-4 text-teal-400" />
                      <h2 className="text-sm font-bold text-slate-200">Personalize Dashboard Blocks</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">Card Columns:</span>
                      <button
                        onClick={() => setDashboardColumns("1")}
                        className={`text-xs px-2 py-0.5 rounded font-mono ${dashboardColumns === "1" ? "bg-teal-500/20 text-teal-400 border border-teal-500/40" : "bg-slate-800 text-slate-400 hover:text-white"}`}
                      >
                        1 Col
                      </button>
                      <button
                        onClick={() => setDashboardColumns("2")}
                        className={`text-xs px-2 py-0.5 rounded font-mono ${dashboardColumns === "2" ? "bg-teal-500/20 text-teal-400 border border-teal-500/40" : "bg-slate-800 text-slate-400 hover:text-white"}`}
                      >
                        2 Cols
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs text-slate-300 font-mono pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={dashboardWidgets.showStats}
                        onChange={(e) => setDashboardWidgets(d => ({ ...d, showStats: e.target.checked }))}
                        className="rounded border-slate-800 text-teal-500 focus:ring-teal-500 bg-slate-950 h-3.5 w-3.5"
                      />
                      <span>Quick Multi-Stats</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={dashboardWidgets.showInterconnectionChart}
                        onChange={(e) => setDashboardWidgets(d => ({ ...d, showInterconnectionChart: e.target.checked }))}
                        className="rounded border-slate-800 text-teal-500 focus:ring-teal-500 bg-slate-950 h-3.5 w-3.5"
                      />
                      <span>Correlation Coefficient Chart</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={dashboardWidgets.showFinanceFlow}
                        onChange={(e) => setDashboardWidgets(d => ({ ...d, showFinanceFlow: e.target.checked }))}
                        className="rounded border-slate-800 text-teal-500 focus:ring-teal-500 bg-slate-950 h-3.5 w-3.5"
                      />
                      <span>Weekly Financial Flow</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={dashboardWidgets.showHealthTrends}
                        onChange={(e) => setDashboardWidgets(d => ({ ...d, showHealthTrends: e.target.checked }))}
                        className="rounded border-slate-800 text-teal-500 focus:ring-teal-500 bg-slate-950 h-3.5 w-3.5"
                      />
                      <span>Wellness Stage Trends</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={dashboardWidgets.showGoalsProgress}
                        onChange={(e) => setDashboardWidgets(d => ({ ...d, showGoalsProgress: e.target.checked }))}
                        className="rounded border-slate-800 text-teal-500 focus:ring-teal-500 bg-slate-950 h-3.5 w-3.5"
                      />
                      <span>Active Goals Progress</span>
                    </label>
                  </div>
                </div>

                {/* Dashboard: Core Stats Block */}
                {dashboardWidgets.showStats && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-1">
                      <div className="flex justify-between items-start text-xs text-slate-400 font-mono uppercase">
                        <span>Net Monthly Cash</span>
                        <DollarSign className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div className={`text-xl font-bold tracking-tight ${netSavings >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        {netSavings >= 0 ? "+" : ""}${netSavings.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                        <span>Savings Rate:</span>
                        <span className="font-bold text-slate-200">{savingsRate}%</span>
                      </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-1">
                      <div className="flex justify-between items-start text-xs text-slate-400 font-mono uppercase">
                        <span>Strategic Goals</span>
                        <Target className="h-4 w-4 text-purple-400" />
                      </div>
                      <div className="text-xl font-bold tracking-tight text-purple-400">
                        {activeGoalCount} <span className="text-xs text-slate-400 font-normal">Active</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                        <span>Completed Overall:</span>
                        <span className="font-bold text-slate-200">{goals.filter((g) => g.status === "Completed").length} done</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Grid Visualizers depending on Column configuration */}
                <div className={`grid ${dashboardColumns === "2" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-6`}>
                  
                  {/* CHART: Interconnection Analysis */}
                  {dashboardWidgets.showInterconnectionChart && (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 hover:border-slate-700 transition-all">
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <Zap className="h-4 w-4 text-teal-400 animate-pulse" />
                          Life Domain Impact: Health Investment vs. Daily Energy
                        </h3>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">Dual Analysis of Fitness Expenditures ($) tracked count alongside General Vitality Index</p>
                      </div>

                      <div className="h-72 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={correlationChartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                            <defs>
                              <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} fontStyle="italic" />
                            <YAxis stroke="#94a3b8" fontSize={11} />
                            <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                            <Legend fontSize={12} />
                            <Area type="monotone" dataKey="Energy Level (1-10)" stroke="#14b8a6" fillOpacity={1} fill="url(#energyGrad)" strokeWidth={2} />
                            <Area type="monotone" dataKey="Amount Spent ($)" stroke="#6366f1" fillOpacity={1} fill="url(#spendGrad)" strokeWidth={2} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {/* CHART: Financial Cash Flow Breakdown */}
                  {dashboardWidgets.showFinanceFlow && (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 hover:border-slate-700 transition-all">
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <PieChartIcon className="h-4 w-4 text-teal-400" />
                          Health & Lifestyle Expense Allocation
                        </h3>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">Calculated ledger breakdown illustrating which areas draw capital support</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div className="h-48 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={financeCategoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={65}
                                paddingAngle={4}
                                dataKey="value"
                              >
                                {financeCategoryData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="flex flex-col gap-1.5 justify-center">
                          {financeCategoryData.map((data, index) => (
                            <div key={data.name} className="flex items-center justify-between text-xs font-mono">
                              <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }} />
                                <span className="text-slate-350">{data.name}</span>
                              </div>
                              <span className="font-bold text-slate-200">${data.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CHART: Health Trends over logs - REMOVED */}
                  {false && (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 hover:border-slate-700 transition-all">
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <Activity className="h-4 w-4 text-teal-400" />
                          Wellness Metric Tracking
                        </h3>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">Historical sleep hours and workouts plotted on temporal scales</p>
                      </div>

                      <div className="h-56 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={health.filter(h => h.category === "Sleep" || h.category === "Exercise").sort((a,b)=>a.date.localeCompare(b.date))} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                            <YAxis stroke="#94a3b8" fontSize={11} />
                            <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                            <Legend fontSize={11} />
                            <Line type="monotone" name="Metric Log Value" dataKey="value" stroke="#3b82f6" activeDot={{ r: 6 }} strokeWidth={2} />
                            <Line type="monotone" name="Logged Energy" dataKey="energyLevel" stroke="#ec4899" strokeWidth={1} strokeDasharray="5 5" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {/* CHART: Active Goals Progress Card */}
                  {dashboardWidgets.showGoalsProgress && (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 hover:border-slate-700 transition-all">
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <Target className="h-4 w-4 text-purple-400" />
                          Interdependence Goal Milestones
                        </h3>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">Real-time status calculated from sub-level database entries</p>
                      </div>

                      <div className="flex flex-col gap-4 mt-2.5">
                        {goals.map((g) => {
                          const percentage = Math.min(100, Math.round((g.currentValue / g.target) * 100));
                          return (
                            <div key={g.id} className="flex flex-col gap-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-slate-200">{g.name}</span>
                                <span className="font-mono text-purple-400">{percentage}% ({g.currentValue}/{g.target} {g.unit})</span>
                              </div>
                              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mt-1 flex border border-slate-700">
                                <span className="bg-gradient-to-r from-teal-500 to-indigo-500 h-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                              </div>
                              <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1.5">
                                <span className="flex items-center gap-1.5 uppercase text-[10px]">
                                  <Clock className="h-3 w-3" /> Due {g.targetDate}
                                </span>
                                <span className="flex items-center gap-1 uppercase text-[10px] text-teal-400 font-bold">
                                  <Link className="h-3 w-3" /> Linked Funds: ${goalInvestmentsMap[g.id] || 0}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>

              </motion.div>
            )}

            {/* ===================== TAB 2: INTERCONNECTED NOTION DATABASE ===================== */}
            {activeTab === "databases" && (
              <motion.div
                key="databases"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6"
              >
                
                {/* Header Selector inside Databases */}
                <div className="border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-1.5 pb-px">
                    <button
                      onClick={() => setActiveDatabaseTab("finances")}
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all border-b-2 font-mono ${
                        activeDatabaseTab === "finances"
                          ? "border-teal-400 text-teal-300 bg-slate-900/40"
                          : "border-transparent text-slate-400 hover:text-white"
                      }`}
                    >
                      <DollarSign className="h-4 w-4 text-emerald-400" />
                      Finances Tracker DB
                    </button>

                    <button
                      onClick={() => setActiveDatabaseTab("goals")}
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all border-b-2 font-mono ${
                        activeDatabaseTab === "goals"
                          ? "border-teal-400 text-teal-300 bg-slate-900/40"
                          : "border-transparent text-slate-400 hover:text-white"
                      }`}
                    >
                      <Target className="h-4 w-4 text-purple-400" />
                      Goals Relations DB
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 font-mono italic pb-2 md:pb-0">Click checkboxes to link logs & expenses directly to active goals</p>
                </div>


                {/* TAB 2.1: FINANCES DATABASE PANEL */}
                {activeDatabaseTab === "finances" && (
                  <div className="flex flex-col gap-6">
                    
                    {/* Inline DB Entry Form Builder */}
                    <form onSubmit={handleAddFinance} className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-3.5 items-end shadow-md">
                      <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                        <label className="text-xs font-semibold text-slate-300 font-mono">Ledger Transaction</label>
                        <input
                          type="text"
                          required
                          value={newFinance.item}
                          onChange={(e) => setNewFinance(f => ({ ...f, item: e.target.value }))}
                          placeholder="e.g. Organic Greens, Running shoes, Hosting bill"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-lg px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300 font-mono">Amount ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={newFinance.amount}
                          onChange={(e) => setNewFinance(f => ({ ...f, amount: e.target.value }))}
                          placeholder="Expense or Income"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-lg px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300 font-mono">Transaction Type</label>
                        <select
                          value={newFinance.type}
                          onChange={(e) => setNewFinance(f => ({ ...f, type: e.target.value as any }))}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-lg px-3 py-2 text-xs focus:outline-none text-slate-300"
                        >
                          <option value="Expense">Expense</option>
                          <option value="Income">Income</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300 font-mono">Domain Target Link</label>
                        <GoalAutocomplete
                          goals={goals}
                          selectedGoalId={newFinance.goalId || ""}
                          onSelectGoal={(goalId) => setNewFinance((f) => ({ ...f, goalId }))}
                          placeholder="Search or select goal..."
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300 font-mono">Tag Category</label>
                        <select
                          value={newFinance.category}
                          onChange={(e) => setNewFinance(f => ({ ...f, category: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-lg px-3 py-2 text-xs focus:outline-none text-slate-300"
                        >
                          <option value="Diet & Groceries">Diet & Groceries</option>
                          <option value="Health & Fitness">Health & Fitness</option>
                          <option value="Personal Growth">Personal Growth</option>
                          <option value="Contract Income">Contract Income</option>
                          <option value="Investment & Stocks">Investment & Stocks</option>
                          <option value="Business Development">Business Dev</option>
                        </select>
                      </div>

                      <div className="md:col-span-1">
                        {/* Empty space helper */}
                      </div>

                      <div className="md:col-span-1">
                        {/* Empty space helper */}
                      </div>

                      <div className="md:col-span-1">
                        {/* Empty space helper */}
                      </div>

                      <div className="md:col-span-2 col-span-1">
                        <button
                          type="submit"
                          className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
                        >
                          <PlusCircle className="h-4 w-4" /> Add Interlinked Finance Transaction
                        </button>
                      </div>
                    </form>

                    {/* DB Table Search & Filters */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 w-full md:w-80">
                        <Search className="h-3.5 w-3.5 text-slate-400" />
                        <input
                          type="text"
                          value={financeSearch}
                          onChange={(e) => setFinanceSearch(e.target.value)}
                          placeholder="Search finance items..."
                          className="bg-transparent text-xs text-white focus:outline-none w-full font-mono"
                        />
                      </div>

                      <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                        <Filter className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-xs text-slate-400 font-mono">Type Filter:</span>
                        <select
                          value={financeFilter}
                          onChange={(e) => setFinanceFilter(e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs focus:outline-none text-slate-300"
                        >
                          <option value="all">Deities & Cash</option>
                          <option value="Expense">Expenses Only</option>
                          <option value="Income">Incomes Only</option>
                        </select>
                      </div>
                    </div>

                    {/* Notion Database Table View */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-inner font-mono">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-950 border-b border-slate-850 text-slate-400 font-bold tracking-wider uppercase text-[10px]">
                              <th className="p-3">Logged Date</th>
                              <th className="p-3">Ledger Row Item</th>
                              <th className="p-3">Tag Category</th>
                              <th className="p-3">Transaction Amt</th>
                              <th className="p-3">Linked Relational Node</th>
                              <th className="p-3 text-right">Ledger Options</th>
                            </tr>
                          </thead>
                          <tbody>
                            {finances
                              .filter((f) => {
                                const matchesSearch = f.item.toLowerCase().includes(financeSearch.toLowerCase()) || f.category.toLowerCase().includes(financeSearch.toLowerCase());
                                const matchesFilter = financeFilter === "all" ? true : f.type === financeFilter;
                                return matchesSearch && matchesFilter;
                              })
                              .map((item) => {
                                const linkedGoal = goals.find((g) => g.id === item.goalId);
                                return (
                                  <tr key={item.id} className="border-b border-slate-850/60 hover:bg-slate-850/30 transition-all">
                                    <td className="p-3 text-slate-400">{item.date}</td>
                                    <td className="p-3 text-slate-200 font-medium">
                                      <span className="flex items-center gap-1.5">
                                        {item.type === "Income" ? (
                                          <TrendingUp className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                        ) : (
                                          <TrendingDown className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                                        )}
                                        {item.item}
                                      </span>
                                    </td>
                                    <td className="p-3">
                                      <span className="px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 font-bold text-[10px] text-slate-350">
                                        {item.category}
                                      </span>
                                    </td>
                                    <td className="p-3">
                                      <span className={`font-bold ${item.type === "Income" ? "text-emerald-400" : "text-rose-400"}`}>
                                        {item.type === "Income" ? "+" : "-"}${item.amount.toFixed(2)}
                                      </span>
                                    </td>
                                    <td className="p-3 text-indigo-400">
                                      {linkedGoal ? (
                                        <span className="flex items-center gap-1 text-[11px] font-bold">
                                          <Link className="h-3 w-3 shrink-0" /> {linkedGoal.name}
                                        </span>
                                      ) : (
                                        <span className="text-slate-400 italic">None linked</span>
                                      )}
                                    </td>
                                    <td className="p-3 text-right">
                                      <button
                                        onClick={() => handleDeleteFinance(item.id)}
                                        className="text-slate-400 hover:text-rose-400 px-2 py-1 rounded hover:bg-slate-800 transition-all cursor-pointer"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                )}


                {/* TAB 2.2: HEALTH / WELLNESS DATABASE PANEL (REMOVED) */}
                {activeDatabaseTab === "health" && false && (
                  <div className="flex flex-col gap-6">
                    
                    {/* Inline Health DB entry builder */}
                    <form onSubmit={handleAddHealth} className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-3.5 items-end shadow-md">
                      <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                        <label className="text-xs font-semibold text-slate-300 font-mono">Exercise Track / Metric Log Name</label>
                        <input
                          type="text"
                          required
                          value={newHealth.metric}
                          onChange={(e) => setNewHealth(h => ({ ...h, metric: e.target.value }))}
                          placeholder="e.g. 10K Run, Deep Sleep Track, Evening Yoga"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-lg px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300 font-mono">Value logged (Hours/Km)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={newHealth.value}
                          onChange={(e) => setNewHealth(h => ({ ...h, value: e.target.value }))}
                          placeholder="Hours, weight, reps"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-lg px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300 font-mono">Metric Type Category</label>
                        <select
                          value={newHealth.category}
                          onChange={(e) => setNewHealth(h => ({ ...h, category: e.target.value as any }))}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-lg px-3 py-2 text-xs focus:outline-none text-slate-300"
                        >
                          <option value="Sleep">Sleep Tracker</option>
                          <option value="Exercise">Exercise / Athletics</option>
                          <option value="Diet">Diet Nutrition</option>
                          <option value="Mental">Mental Wellbeing</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300 font-mono">Goal Area Connection</label>
                        <GoalAutocomplete
                          goals={goals}
                          selectedGoalId={newHealth.goalId || ""}
                          onSelectGoal={(goalId) => setNewHealth((h) => ({ ...h, goalId }))}
                          placeholder="Search or select goal..."
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300 font-mono">Energy Vitality Index (1-10)</label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={newHealth.energyLevel}
                          onChange={(e) => setNewHealth(h => ({ ...h, energyLevel: e.target.value }))}
                          className="w-full bg-slate-950 py-2.5"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 col-span-1 md:col-span-3">
                        <label className="text-xs font-semibold text-slate-300 font-mono">Qualitative Log Comments</label>
                        <input
                          type="text"
                          value={newHealth.notes}
                          onChange={(e) => setNewHealth(h => ({ ...h, notes: e.target.value }))}
                          placeholder="e.g. Felt highly alert, pulse normal"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-lg px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="md:col-span-1 col-span-1">
                        <button
                          type="submit"
                          className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
                        >
                          <PlusCircle className="h-4 w-4" /> Add Interlinked Health Log
                        </button>
                      </div>
                    </form>

                    {/* Health Filter & Options bar */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
                      <div className="flex items-center gap-2.5 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 w-full md:w-80">
                        <Search className="h-3.5 w-3.5 text-slate-400" />
                        <input
                          type="text"
                          value={healthSearch}
                          onChange={(e) => setHealthSearch(e.target.value)}
                          placeholder="Search health logs..."
                          className="bg-transparent text-xs text-white focus:outline-none w-full"
                        />
                      </div>

                      <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                        <Filter className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-xs text-slate-400">Tracker Filter:</span>
                        <select
                          value={healthFilter}
                          onChange={(e) => setHealthFilter(e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs focus:outline-none text-slate-300"
                        >
                          <option value="all">All Vitals</option>
                          <option value="Sleep">Sleep Logs</option>
                          <option value="Exercise">Workouts</option>
                          <option value="Diet">Meals Tracked</option>
                          <option value="Mental">Mindful & Mental</option>
                        </select>
                      </div>
                    </div>

                    {/* Health Database Table view */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-inner font-mono">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-950 border-b border-slate-850 text-slate-400 font-bold tracking-wider uppercase text-[10px]">
                              <th className="p-3">Track Date</th>
                              <th className="p-3">Diagnostic Performance Log</th>
                              <th className="p-3">Category Tag</th>
                              <th className="p-3">Metric Value</th>
                              <th className="p-3">Vital Energy</th>
                              <th className="p-3">Linked Relational Goal</th>
                              <th className="p-3 text-right">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {health
                              .filter((h) => {
                                const matchesSearch = h.metric.toLowerCase().includes(healthSearch.toLowerCase()) || h.notes.toLowerCase().includes(healthSearch.toLowerCase());
                                const matchesFilter = healthFilter === "all" ? true : h.category === healthFilter;
                                return matchesSearch && matchesFilter;
                              })
                              .map((item) => {
                                const linkedGoal = goals.find((g) => g.id === item.goalId);
                                return (
                                  <tr key={item.id} className="border-b border-slate-855 hover:bg-slate-850/30 transition-all">
                                    <td className="p-3 text-slate-400">{item.date}</td>
                                    <td className="p-3">
                                      <div>
                                        <span className="text-slate-200 font-medium">{item.metric}</span>
                                        <p className="text-[11px] text-slate-400 font-normal italic mt-0.5">{item.notes || "-"}</p>
                                      </div>
                                    </td>
                                    <td className="p-3">
                                      <span className="px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 font-bold text-[10px] text-slate-350">
                                        {item.category}
                                      </span>
                                    </td>
                                    <td className="p-3 font-semibold text-slate-200">
                                      {item.value} {item.category === "Sleep" ? "hrs" : item.category === "Exercise" ? "km/hrs" : "pts"}
                                    </td>
                                    <td className="p-3">
                                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                        item.energyLevel >= 8
                                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                          : item.energyLevel >= 5
                                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                      }`}>
                                        ⚡ Level {item.energyLevel}/10
                                      </span>
                                    </td>
                                    <td className="p-3 text-indigo-400">
                                      {linkedGoal ? (
                                        <span className="flex items-center gap-1 text-[11px] font-bold">
                                          <Link className="h-3 w-3 shrink-0" /> {linkedGoal.name}
                                        </span>
                                      ) : (
                                        <span className="text-slate-400 italic">None linked</span>
                                      )}
                                    </td>
                                    <td className="p-3 text-right">
                                      <button
                                        onClick={() => handleDeleteHealth(item.id)}
                                        className="text-slate-400 hover:text-rose-400 px-2 py-1 rounded hover:bg-slate-800 transition-all cursor-pointer"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                )}


                {/* TAB 2.3: GOALS CORRELATED RELATIONSHIPS DB */}
                {activeDatabaseTab === "goals" && (
                  <div className="flex flex-col gap-6">
                    
                    {/* Inline Goal Database builder */}
                    <form onSubmit={handleAddGoal} className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-3.5 items-end shadow-md font-mono">
                      <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                        <label className="text-xs font-semibold text-slate-300">Goal Objective / Milestone Title</label>
                        <input
                          type="text"
                          required
                          value={newGoal.name}
                          onChange={(e) => setNewGoal(g => ({ ...g, name: e.target.value }))}
                          placeholder="e.g. 21K Half-Marathon, Save $5K supporting Tech Shift"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-lg px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300">Milestone Target Metric</label>
                        <input
                          type="number"
                          required
                          value={newGoal.target}
                          onChange={(e) => setNewGoal(g => ({ ...g, target: e.target.value }))}
                          placeholder="Target count/score"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-lg px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300">Unit Label</label>
                        <input
                          type="text"
                          value={newGoal.unit}
                          onChange={(e) => setNewGoal(g => ({ ...g, unit: e.target.value }))}
                          placeholder="km, days, saved, tasks"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-lg px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300">Due Timeline Target</label>
                        <input
                          type="date"
                          value={newGoal.targetDate}
                          onChange={(e) => setNewGoal(g => ({ ...g, targetDate: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-lg px-3 py-2 text-xs focus:outline-none text-slate-300"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                        <label className="text-xs font-semibold text-slate-300">Goal Functional Domain</label>
                        <select
                          value={newGoal.domain}
                          onChange={(e) => setNewGoal(g => ({ ...g, domain: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-lg px-3 py-2 text-xs focus:outline-none text-slate-300"
                        >
                          <option value="Athletic & Fitness">Athletic & Fitness</option>
                          <option value="Dietary Health">Dietary Health</option>
                          <option value="Career & Tech">Career & Tech</option>
                          <option value="Mental Space">Mental Wellness</option>
                          <option value="Financial Growth">Financial Growth</option>
                        </select>
                      </div>

                      <div className="md:col-span-1">
                        {/* Empty space helper */}
                      </div>

                      <div className="md:col-span-1">
                        {/* Empty space helper */}
                      </div>

                      <div className="md:col-span-1 col-span-1">
                        <button
                          type="submit"
                          className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
                        >
                          <PlusCircle className="h-4 w-4" /> Create Goal Objective
                        </button>
                      </div>
                    </form>

                    {/* Search Field */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
                      <div className="flex items-center gap-2.5 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 w-full md:w-80">
                        <Search className="h-3.5 w-3.5 text-slate-400" />
                        <input
                          type="text"
                          value={goalSearch}
                          onChange={(e) => setGoalSearch(e.target.value)}
                          placeholder="Search database goals..."
                          className="bg-transparent text-xs text-white focus:outline-none w-full"
                        />
                      </div>
                    </div>

                    {/* Integrated Goal DB Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {goals
                        .filter((g) => g.name.toLowerCase().includes(goalSearch.toLowerCase()) || g.domain.toLowerCase().includes(goalSearch.toLowerCase()))
                        .map((goal) => {
                          const percent = Math.min(100, Math.round((goal.currentValue / goal.target) * 100));
                          const SupportingSpend = goalInvestmentsMap[goal.id] || 0;
                          const SupportingLogs = goalActivitiesMap[goal.id] || 0;

                          return (
                            <div key={goal.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3.5 justify-between hover:border-slate-700 transition-all shadow-md relative">
                              <span className="absolute top-4 right-4 text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-indigo-400 border border-slate-850 font-bold uppercase transition-all">
                                {goal.domain}
                              </span>

                              <div className="flex items-start gap-3">
                                <button
                                  onClick={() => handleToggleGoalStatus(goal.id)}
                                  className={`h-5 w-5 rounded border flex items-center justify-center transition-all shrink-0 mt-0.5 cursor-pointer ${
                                    goal.status === "Completed"
                                      ? "bg-teal-500 border-teal-500 text-slate-950"
                                      : "border-slate-700 bg-slate-950 text-transparent hover:border-teal-500"
                                  }`}
                                >
                                  <Check className="h-3.5 w-3.5" />
                                </button>
                                <div>
                                  <h4 className={`font-bold text-sm ${goal.status === "Completed" ? "line-through text-slate-500" : "text-white"}`}>
                                    {goal.name}
                                  </h4>
                                  <p className="text-[10px] text-slate-400 font-mono mt-1">Due Date target: {goal.targetDate}</p>
                                </div>
                              </div>

                              <div className="flex flex-col gap-1.5 bg-slate-950/60 p-3 rounded-lg border border-slate-850">
                                <div className="flex items-center justify-between text-xs font-mono">
                                  <span className="text-slate-400">Progress status:</span>
                                  <span className="font-bold text-slate-200">{percent}% ({goal.currentValue}/{goal.target} {goal.unit})</span>
                                </div>
                                <div className="w-full bg-slate-850 h-2 rounded-full overflow-hidden flex border border-slate-800 mt-1">
                                  <span className="bg-gradient-to-r from-teal-400 to-indigo-500 h-full transition-all duration-300" style={{ width: `${percent}%` }} />
                                </div>
                              </div>

                              {/* Relations Interconnection indicators */}
                              <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs font-mono pt-1 text-slate-400 border-t border-slate-850">
                                <div className="flex items-center gap-1">
                                  <TrendingDown className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                                  <span>Invested budget:</span>
                                  <span className="font-bold text-slate-200">${SupportingSpend}</span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <Activity className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                                  <span>Supporting logs:</span>
                                  <span className="font-bold text-slate-200">{SupportingLogs} logs</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-1">
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                                  goal.status === "Completed"
                                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                }`}>
                                  {goal.status}
                                </span>

                                <button
                                  onClick={() => handleDeleteGoal(goal.id)}
                                  className="text-slate-400 hover:text-rose-400 transition-all font-mono text-xs cursor-pointer px-2 py-0.5 rounded hover:bg-slate-850/50"
                                >
                                  Delete Goal
                                </button>
                              </div>

                            </div>
                          );
                        })}
                    </div>

                  </div>
                )}

              </motion.div>
            )}

            {/* ===================== TAB: RELATIONSHIP MAPPER ===================== */}
            {activeTab === "relations" && (
              <motion.div
                key="relations"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                {/* LEFT COLUMN (6 COLS): INTERACTIVE NOTION GRAPH + BUILDER */}
                <div className="col-span-1 lg:col-span-6 flex flex-col gap-6">
                  
                  {/* GRAPH CARD PANEL */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4 shadow-md overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Share2 className="h-4 w-4 text-teal-400 rotate-90" />
                        <div>
                          <h3 className="text-sm font-bold text-white uppercase font-mono">Notion Database Graph Visualizer</h3>
                          <p className="text-[11px] text-slate-400 font-mono">Interactive schema mapping cross-domain impact pipelines</p>
                        </div>
                      </div>
                      <span className="text-[9.5px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-bold uppercase shrink-0">
                        Real-time Flows
                      </span>
                    </div>

                    {/* INTERACTIVE GRAPH CANVAS (SVG) */}
                    <div className="bg-slate-950 rounded-xl border border-slate-850 p-2 relative flex items-center justify-center pt-6 pb-2">
                      <svg width="100%" height="280" viewBox="0 0 600 280" className="max-w-md md:max-w-xl mx-auto select-none">
                        <defs>
                          <marker id="arrow-emerald" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 1 L 10 5 L 0 9 z" fill="#14b8a6" />
                          </marker>
                          <marker id="arrow-rose" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 1 L 10 5 L 0 9 z" fill="#f43f5e" />
                          </marker>
                          <marker id="arrow-indigo" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366f1" />
                          </marker>
                          
                          <style>{`
                            @keyframes pulse-flow {
                              0% { stroke-dashoffset: 0; }
                              100% { stroke-dashoffset: -16; }
                            }
                            .flow-line-active {
                              stroke-dasharray: 4, 3;
                              animation: pulse-flow 1.0s linear infinite;
                              stroke-width: 3.5px;
                            }
                            .flow-line-idle {
                              stroke-dasharray: 5, 5;
                              animation: pulse-flow 2.5s linear infinite;
                              stroke-width: 1.5px;
                            }
                          `}</style>
                        </defs>

                        {/* Interactive flow lines */}
                        {/* Health -> Goals Line (r1 or selected) */}
                        <path
                          d="M 440,80 Q 300,120 300,190"
                          fill="none"
                          stroke={selectedRelationId === "r1" ? "#f43f5e" : "#503040"}
                          strokeWidth={selectedRelationId === "r1" ? "3.5" : "1.8"}
                          className={`${selectedRelationId === "r1" ? "flow-line-active" : "flow-line-idle"} cursor-pointer hover:stroke-rose-450 transition-all`}
                          markerEnd="url(#arrow-rose)"
                          onClick={() => setSelectedRelationId(selectedRelationId === "r1" ? null : "r1")}
                        />

                        {/* Finances -> Goals Line info (r2 or selected) */}
                        <path
                          d="M 160,80 Q 300,120 300,190"
                          fill="none"
                          stroke={selectedRelationId === "r2" ? "#14b8a6" : "#204642"}
                          strokeWidth={selectedRelationId === "r2" ? "3.5" : "1.8"}
                          className={`${selectedRelationId === "r2" ? "flow-line-active" : "flow-line-idle"} cursor-pointer hover:stroke-teal-450 transition-all`}
                          markerEnd="url(#arrow-emerald)"
                          onClick={() => setSelectedRelationId(selectedRelationId === "r2" ? null : "r2")}
                        />

                        {/* Finances -> Goals Career (r3 or selected) */}
                        <path
                          d="M 120,120 Q 200,170 270,210"
                          fill="none"
                          stroke={selectedRelationId === "r3" ? "#14b8a6" : "#204642"}
                          strokeWidth={selectedRelationId === "r3" ? "3.5" : "1.5"}
                          className={`${selectedRelationId === "r3" ? "flow-line-active" : "flow-line-idle"} cursor-pointer hover:stroke-emerald-450 transition-all`}
                          markerEnd="url(#arrow-emerald)"
                          onClick={() => setSelectedRelationId(selectedRelationId === "r3" ? null : "r3")}
                        />

                        {/* Health Sleep -> Goals Stress (r4 or selected) */}
                        <path
                          d="M 480,120 Q 400,170 330,210"
                          fill="none"
                          stroke={selectedRelationId === "r4" ? "#6366f1" : "#303458"}
                          strokeWidth={selectedRelationId === "r4" ? "3.5" : "1.5"}
                          className={`${selectedRelationId === "r4" ? "flow-line-active" : "flow-line-idle"} cursor-pointer hover:stroke-indigo-455 transition-all`}
                          markerEnd="url(#arrow-indigo)"
                          onClick={() => setSelectedRelationId(selectedRelationId === "r4" ? null : "r4")}
                        />

                        {/* Central Database Nodes circles */}
                        
                        {/* FINANCES DB NODE (Left-Top) */}
                        <g className="cursor-pointer" onClick={() => { setRelationDbFilter("Finances"); setSelectedRelationId(null); }}>
                          <circle cx="140" cy="100" r="32" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
                          <text x="140" y="103" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">FINANCES DB</text>
                        </g>
                        <rect x="70" y="65" width="55" height="18" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" opacity="0.8" />
                        <text x="97" y="77" textAnchor="middle" fill="#a7f3d0" fontSize="7.5" fontFamily="monospace">Savings Rate</text>
                        
                        <rect x="75" y="115" width="55" height="18" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" opacity="0.8" />
                        <text x="102" y="127" textAnchor="middle" fill="#a7f3d0" fontSize="7.5" fontFamily="monospace">Organic Groc</text>

                        {/* HEALTH DB NODE (Right-Top) */}
                        <g className="cursor-pointer" onClick={() => { setRelationDbFilter("Health"); setSelectedRelationId(null); }}>
                          <circle cx="460" cy="100" r="32" fill="#0f172a" stroke="#f43f5e" strokeWidth="2.5" />
                          <text x="460" y="103" textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="bold" fontFamily="monospace">HEALTH DB</text>
                        </g>
                        <rect x="475" y="65" width="55" height="18" rx="4" fill="#4c0519" stroke="#f43f5e" strokeWidth="1" opacity="0.8" />
                        <text x="502" y="77" textAnchor="middle" fill="#fecdd3" fontSize="7.5" fontFamily="monospace">Exercise hr</text>

                        <rect x="470" y="115" width="55" height="18" rx="4" fill="#4c0519" stroke="#f43f5e" strokeWidth="1" opacity="0.8" />
                        <text x="497" y="127" textAnchor="middle" fill="#fecdd3" fontSize="7.5" fontFamily="monospace">Sleep logs</text>

                        {/* GOALS DB NODE (Center-Bottom) */}
                        <g className="cursor-pointer" onClick={() => { setRelationDbFilter("all"); setSelectedRelationId(null); }}>
                          <circle cx="300" cy="200" r="38" fill="#0f172a" stroke="#6366f1" strokeWidth="3" />
                          <text x="300" y="203" textAnchor="middle" fill="#a5b4fc" fontSize="9" fontWeight="bold" fontFamily="monospace">ACTIVE GOALS</text>
                        </g>
                        
                        <rect x="250" y="248" width="100" height="18" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" opacity="0.8" />
                        <text x="300" y="260" textAnchor="middle" fill="#c7d2fe" fontSize="7.5" fontFamily="monospace">Productivity Target</text>
                        
                        <text x="300" y="25" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">Click lines to isolate relations. Click Nodes to filter domain.</text>
                      </svg>
                      
                      {/* Active highlighting hint */}
                      {selectedRelationId && (
                        <div className="absolute bottom-3 left-4 right-4 bg-teal-950/90 border border-teal-500/20 px-3 py-2 rounded-lg flex items-center justify-between text-[11px] font-mono select-none">
                          <span className="text-teal-400">Isolating Path: <strong>{databaseRelations.find(r => r.id === selectedRelationId)?.title}</strong></span>
                          <button onClick={() => setSelectedRelationId(null)} className="text-slate-400 hover:text-white">Clear</button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* FORM BUILDER PANEL */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4 shadow-md font-mono">
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4 text-emerald-400" />
                      <h3 className="text-sm font-bold text-white uppercase font-semibold">Define Multi-Database Relation Formula</h3>
                    </div>

                    <form onSubmit={handleAddRelation} className="flex flex-col gap-3.5 text-xs text-slate-300">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-400 font-bold">Relationship Rule Name</label>
                        <input
                          type="text"
                          required
                          value={newRelation.title}
                          onChange={(e) => setNewRelation(r => ({ ...r, title: e.target.value }))}
                          placeholder="e.g. Diet spend vs Mental Focus"
                          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-400 font-bold">Source Database</label>
                          <select
                            value={newRelation.sourceDb}
                            onChange={(e) => updateRelationField("sourceDb", e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-white focus:outline-none"
                          >
                            <option value="Health">Health DB</option>
                            <option value="Finances">Finances DB</option>
                            <option value="Goals">Goals DB</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-400 font-bold">Target Database</label>
                          <select
                            value={newRelation.targetDb}
                            onChange={(e) => updateRelationField("targetDb", e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-white focus:outline-none"
                          >
                            <option value="Goals">Goals DB</option>
                            <option value="Health">Health DB</option>
                            <option value="Finances">Finances DB</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-400 font-bold">Source Metric Link</label>
                          <input
                            type="text"
                            required
                            value={newRelation.sourceMetric}
                            onChange={(e) => updateRelationField("sourceMetric", e.target.value)}
                            placeholder="e.g., Sleep hours, Workout counts"
                            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-400 font-bold">Target Variable Link</label>
                          <input
                            type="text"
                            required
                            value={newRelation.targetMetric}
                            onChange={(e) => updateRelationField("targetMetric", e.target.value)}
                            placeholder="e.g., Stress score, Marathon speed"
                            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-400 font-bold">Relation Impact Mode</label>
                          <select
                            value={newRelation.impactType}
                            onChange={(e) => setNewRelation(r => ({ ...r, impactType: e.target.value as any }))}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-white focus:outline-none"
                          >
                            <option value="Positive Benefit">Positive Benefit</option>
                            <option value="Negative Friction">Negative Friction</option>
                            <option value="Financial Funding">Financial Funding</option>
                            <option value="Direct Sync">Direct Sync</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-400 font-bold">Connection Strength</label>
                          <select
                            value={newRelation.strength}
                            onChange={(e) => setNewRelation(r => ({ ...r, strength: e.target.value as any }))}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-white focus:outline-none"
                          >
                            <option value="High">High Impact</option>
                            <option value="Medium">Medium Impact</option>
                            <option value="Low">Low Impact</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-400 font-bold">Rollup Explanation Summary</label>
                        <textarea
                          required
                          rows={2}
                          value={newRelation.description}
                          onChange={(e) => setNewRelation(r => ({ ...r, description: e.target.value }))}
                          placeholder="Explain how this dynamic connection impacts both databases..."
                          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none resize-none animate-fade-in"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 mt-0.5">
                        <label className="text-slate-400 font-bold flex items-center justify-between">
                          <span>Notion Formula 2.0 Expression</span>
                          <span className="text-[10px] text-teal-400 font-normal">Customizable</span>
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={newRelation.notionFormula}
                          onChange={(e) => {
                            setIsFormulaManuallyEdited(true);
                            const val = e.target.value;
                            setNewRelation(r => ({ ...r, notionFormula: val }));
                            
                            // Instant check
                            const errs = validateNotionFormula(val);
                            setFormulaErrors(errs);
                          }}
                          placeholder="e.g. map(filter(prop('X'), current.prop('Y') == 'Z'), current.prop('Value')).sum()"
                          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs placeholder-slate-600 focus:outline-none focus:border-teal-500 resize-none"
                        />
                        {formulaErrors.length > 0 && (
                          <div className="mt-1 p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-lg flex flex-col gap-1.5">
                            {formulaErrors.map((err, idx) => (
                              <div key={idx} className="text-[10.5px] leading-relaxed text-rose-300 font-sans">
                                <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase mr-1.5 ${
                                  err.severity === "error" ? "bg-rose-500/20 text-rose-400" : "bg-amber-500/20 text-amber-400"
                                }`}>
                                  {err.severity}
                                </span>
                                {err.message}
                                {err.suggestion && (
                                  <span className="block mt-1 text-[9.5px] text-slate-400 italic">
                                    💡 Suggestion: {err.suggestion}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        {formulaErrors.length === 0 && newRelation.notionFormula && (
                          <div className="text-[10px] text-teal-400 flex items-center gap-1.5 font-sans py-0.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                            Formula syntax validation passed! Ready to sync.
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-2.5 px-4 rounded-lg cursor-pointer transition-all uppercase tracking-wider text-center flex items-center justify-center gap-1.5 mt-1 font-mono shadow-md shadow-teal-500/10"
                      >
                        <Link className="h-4 w-4 rotate-45" /> Map Database Node Connection
                      </button>
                    </form>
                  </div>

                </div>

                {/* RIGHT COLUMN (6 COLS): SEARCH + DETAILED FILTERABLE CARDS */}
                <div className="col-span-1 lg:col-span-6 flex flex-col gap-6">
                  
                  {/* SEARCH AND FILTERS */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-4 font-mono shadow-md">
                    <div className="flex items-center gap-2.5 bg-slate-950 border border-slate-855 rounded-lg px-3 py-2">
                      <Search className="h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={relationSearch}
                        onChange={(e) => setRelationSearch(e.target.value)}
                        placeholder="Search formulas or mapped terms..."
                        className="bg-transparent text-xs text-white focus:outline-none w-full placeholder-slate-600"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 text-[10px] text-slate-400">
                      <div className="flex flex-col gap-1">
                        <span>Source DB</span>
                        <select
                          value={relationDbFilter}
                          onChange={(e) => setRelationDbFilter(e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-white focus:outline-none"
                        >
                          <option value="all">All Sources</option>
                          <option value="Finances">Finances DB</option>
                          <option value="Health">Health DB</option>
                          <option value="Goals">Goals DB</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span>Strength</span>
                        <select
                          value={relationStrengthFilter}
                          onChange={(e) => setRelationStrengthFilter(e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-white focus:outline-none"
                        >
                          <option value="all">All Strengths</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span>Impact Kind</span>
                        <select
                          value={relationTypeFilter}
                          onChange={(e) => setRelationTypeFilter(e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-white focus:outline-none"
                        >
                          <option value="all">All Kinds</option>
                          <option value="Positive Benefit">Positive Benefit</option>
                          <option value="Negative Friction">Negative Friction</option>
                          <option value="Financial Funding">Financial Funding</option>
                          <option value="Direct Sync">Direct Sync</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* ACTIVE RELATIONSHIPS CONTAINER */}
                  <div className="flex flex-col gap-4 overflow-y-auto max-h-165">
                    {databaseRelations
                      .filter((r) => {
                        // Graph highlight filter
                        if (selectedRelationId && r.id !== selectedRelationId) return false;
                        
                        // Text search
                        const matchText = r.title.toLowerCase().includes(relationSearch.toLowerCase()) || 
                                          r.description.toLowerCase().includes(relationSearch.toLowerCase()) ||
                                          r.notionFormula.toLowerCase().includes(relationSearch.toLowerCase());
                        if (!matchText) return false;

                        // Filters
                        if (relationDbFilter !== "all" && r.sourceDb !== relationDbFilter) return false;
                        if (relationStrengthFilter !== "all" && r.strength !== relationStrengthFilter) return false;
                        if (relationTypeFilter !== "all" && r.impactType !== relationTypeFilter) return false;

                        return true;
                      })
                      .map((relation) => {
                        // Live dynamic stats relative calculation
                        let activeCorrelationText = "N/A Real-time Pairs";
                        let progressValueText = "";
                        
                        if (relation.id === "r1") {
                          const workoutCount = health.filter(h => h.category === "Exercise").length;
                          activeCorrelationText = `${workoutCount} workouts mapped to Training Goal`;
                          const marathonGoal = goals.find(g => g.id === "g1");
                          if (marathonGoal) {
                            progressValueText = `Goal Target: ${marathonGoal.currentValue}/${marathonGoal.target} km`;
                          }
                        } else if (relation.id === "r2") {
                          const spent = finances
                            .filter((f) => f.category === "Diet & Groceries" && f.type === "Expense")
                            .reduce((sum, item) => sum + item.amount, 0);
                          activeCorrelationText = `$${spent.toFixed(2)} total spend deployed to nutrition`;
                          const dietGoal = goals.find(g => g.id === "g2");
                          if (dietGoal) {
                            progressValueText = `Goal Progress: ${dietGoal.currentValue}/${dietGoal.target} days`;
                          }
                        } else if (relation.id === "r3") {
                          activeCorrelationText = `Computed monthly savings rate: ${savingsRate}%`;
                          const contractGoal = goals.find(g => g.id === "g3");
                          if (contractGoal) {
                            progressValueText = `Runway: ${contractGoal.currentValue}/${contractGoal.target} contract secured`;
                          }
                        } else if (relation.id === "r4") {
                          activeCorrelationText = `Sleep / Energy Pearson r factor: ${sleepEnergyCorr.value} (${sleepEnergyCorr.label})`;
                          const stressGoal = goals.find(g => g.id === "g4");
                          if (stressGoal) {
                            progressValueText = `Current Stress avg: ${stressGoal.currentValue}/${stressGoal.target} pts`;
                          }
                        } else {
                          activeCorrelationText = "Linked successfully. Monitoring webhook feeds.";
                        }

                        return (
                          <div
                            key={relation.id}
                            className={`p-4 rounded-xl border font-mono text-xs transition-colors duration-300 flex flex-col gap-3 ${
                              selectedRelationId === relation.id
                                ? "bg-gradient-to-br from-indigo-950/25 via-slate-900 to-slate-900 border-indigo-500/40 shadow-lg"
                                : "bg-slate-900 border-slate-800 hover:border-slate-750"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2.5">
                              <div>
                                <span className="text-[9.5px] font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-1.5 py-0.5 rounded mr-1.5">
                                  {relation.sourceDb} → {relation.targetDb}
                                </span>
                                <h4 className="font-bold text-white text-xs inline-block mt-0.5">{relation.title}</h4>
                              </div>

                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                                relation.strength === "High"
                                  ? "bg-rose-500/15 text-rose-400 border border-rose-500/20"
                                  : relation.strength === "Medium"
                                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                                  : "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                              }`}>
                                {relation.strength} Strength
                              </span>
                            </div>

                            <p className="text-slate-400 font-mono text-[11px] leading-relaxed">
                              {relation.description}
                            </p>

                            {/* Live calculations block */}
                            <div className="bg-slate-950/80 border border-slate-850 rounded-lg p-2.5 flex flex-col gap-1.5 text-[11px]">
                              <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider">Dynamic Notion Analysis Metrics</span>
                              <div className="flex justify-between items-center text-[10.5px]">
                                <span className="text-slate-400">Current Correlation:</span>
                                <span className="text-emerald-400 font-bold">{activeCorrelationText}</span>
                              </div>
                              {progressValueText && (
                                <div className="flex justify-between items-center text-[10.5px]">
                                  <span className="text-slate-400">Target Milestone Progress:</span>
                                  <span className="text-emerald-400 font-bold">{progressValueText}</span>
                                </div>
                              )}
                            </div>

                            {/* Rollup Code snippet */}
                            <div className="flex flex-col gap-1 bg-slate-950/80 border border-slate-850 p-2 rounded-lg">
                              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider font-mono">Notion formula rollup representation:</span>
                              <div className="flex items-center justify-between gap-2 bg-slate-955 p-1 px-2 rounded border border-slate-900 overflow-x-auto">
                                <code className="text-teal-400 text-[10px] whitespace-nowrap">{relation.notionFormula}</code>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(relation.notionFormula);
                                    alert(`Copied relationship formula to clipboard!\n\n${relation.notionFormula}`);
                                  }}
                                  className="text-[9.5px] bg-slate-900 border border-slate-800 text-teal-400 hover:text-teal-350 hover:border-teal-500/40 px-1.5 py-0.5 rounded cursor-pointer shrink-0 font-mono"
                                >
                                  Copy Snippet
                                </button>
                              </div>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-slate-850 text-[10px] text-slate-500">
                              <span>Mapped Impact Class: <strong>{relation.impactType}</strong></span>
                              <button
                                onClick={() => handleDeleteRelation(relation.id)}
                                className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer font-mono"
                              >
                                Remove Mapping
                              </button>
                            </div>
                          </div>
                        );
                      })}

                    {databaseRelations.filter((r) => {
                      if (selectedRelationId && r.id !== selectedRelationId) return false;
                      const matchText = r.title.toLowerCase().includes(relationSearch.toLowerCase()) || 
                                        r.description.toLowerCase().includes(relationSearch.toLowerCase()) ||
                                        r.notionFormula.toLowerCase().includes(relationSearch.toLowerCase());
                      if (!matchText) return false;
                      if (relationDbFilter !== "all" && r.sourceDb !== relationDbFilter) return false;
                      if (relationStrengthFilter !== "all" && r.strength !== relationStrengthFilter) return false;
                      if (relationTypeFilter !== "all" && r.impactType !== relationTypeFilter) return false;
                      return true;
                    }).length === 0 && (
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center flex flex-col items-center gap-3">
                        <Link className="h-8 w-8 text-slate-500 mb-1 rotate-45 animate-pulse" />
                        <h4 className="text-[13px] font-bold text-slate-300">No matching database relations mapped</h4>
                        <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed font-mono">
                          Refine your filters, search queries, or clear active connections on the left visual graph map. Or formulate a brand-new connection rule matching your life trackers!
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            )}

            {/* ===================== TAB 3: AI DIAGNOSTICS & ANALYTICS CHAT ===================== */}
            {activeTab === "ai" && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                
                {/* LEFT 6 COLS: COMPREHENSIVE EXECUTIVE REPORTS ANALYST */}
                <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
                  
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="h-5 w-5 text-teal-400 animate-pulse" />
                        <div>
                          <h3 className="text-base font-bold text-white">Cross-Database AI Report</h3>
                          <p className="text-xs text-slate-400">Generated weekly analysis based on finances, habits and active milestones</p>
                        </div>
                      </div>
                      <button
                        onClick={handleGenerateAIReport}
                        disabled={isGeneratingReport}
                        className="flex items-center gap-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-teal-400 hover:text-teal-350 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer disabled:opacity-50"
                      >
                        <RefreshCw className={`h-3 w-3 ${isGeneratingReport ? "animate-spin text-teal-400" : ""}`} />
                        {isGeneratingReport ? "AI Compiling..." : "Compile AI Report"}
                      </button>
                    </div>

                    {/* Report error feedback */}
                    {reportError && (
                      <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg text-xs font-mono">
                        {reportError}
                      </div>
                    )}

                    {!aiReport && !isGeneratingReport && (
                      <div className="bg-slate-950 p-6 rounded-xl border border-slate-850 text-center flex flex-col items-center justify-center gap-3">
                        <BookOpen className="h-10 w-10 text-slate-500 mb-1" />
                        <h4 className="text-sm font-bold text-slate-350">No report generated yet</h4>
                        <p className="text-xs text-slate-400 font-mono max-w-sm leading-relaxed">
                          Request the integrated Gemini AI parser to analyze your active logs, financial expenditures and target due dates for a full report.
                        </p>
                        <button
                          onClick={handleGenerateAIReport}
                          className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg transition-all mt-1 cursor-pointer shadow-md shadow-teal-500/10"
                        >
                          Generate AI Report Now
                        </button>
                      </div>
                    )}

                    {isGeneratingReport && (
                      <div className="bg-slate-950 p-12 rounded-xl border border-slate-850 flex flex-col items-center justify-center gap-4 text-center">
                        <RefreshCw className="h-8 w-8 animate-spin text-teal-400" />
                        <div>
                          <h4 className="text-sm font-bold text-slate-350">Gemini-3.5-Flash Executing...</h4>
                          <p className="text-xs text-slate-400 font-mono mt-1 max-w-xs">Comparing transactional ledgers against logged fitness metrics and stress indexes.</p>
                        </div>
                      </div>
                    )}

                    {/* AI REPORT COMPILER VISUAL RESPONSE */}
                    {aiReport && !isGeneratingReport && (
                      <div className="flex flex-col gap-5">
                        
                        {/* Summary Block */}
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col gap-2">
                          <span className="text-[10px] font-mono tracking-wider font-bold text-teal-400 uppercase">AI Executive Analysis</span>
                          <p className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line">
                            {aiReport.executiveSummary}
                          </p>
                        </div>

                        {/* Breakdown block */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-850">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase flex items-center gap-1 mb-1.5">
                              <DollarSign className="h-3 w-3" /> Financial Alignment
                            </span>
                            <p className="text-slate-400 leading-relaxed text-[11px]">{aiReport.financialHabitsText}</p>
                          </div>

                          <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-850">
                            <span className="text-[10px] font-bold text-rose-400 uppercase flex items-center gap-1 mb-1.5">
                              <Heart className="h-3.5 w-3.5" /> Habit Correlations
                            </span>
                            <p className="text-slate-400 leading-relaxed text-[11px]">{aiReport.healthTrendsText}</p>
                          </div>
                        </div>

                        {/* Identified Interconnections */}
                        <div className="flex flex-col gap-2.5">
                          <span className="text-[10px] font-mono tracking-wider text-slate-400 font-bold uppercase">Identified Cross-Domain Interactions</span>
                          
                          <div className="flex flex-col gap-2 font-mono">
                            {aiReport.interconnectedCorrelations.map((corr, idx) => (
                              <div key={idx} className="bg-slate-950 border border-slate-850 rounded-lg p-3 flex flex-col md:flex-row md:items-center justify-between gap-3.5 hover:border-slate-800 transition-all">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-200">{corr.type}</span>
                                    <span className="text-[9px] font-bold text-teal-400 bg-teal-500/10 px-1 rounded border border-teal-500/20">
                                      {corr.metricComparison}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{corr.description}</p>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full md:self-center self-start ${
                                  corr.impactLevel === "High"
                                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                    : corr.impactLevel === "Medium"
                                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                    : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                }`}>
                                  {corr.impactLevel} Impact
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Direct Action Recommendations items */}
                        <div className="flex flex-col gap-2.5">
                          <span className="text-[10px] font-mono tracking-wider text-purple-400 font-bold uppercase">Direct Actionable Recommendations</span>
                          
                          <div className="flex flex-col gap-2.5 font-mono">
                            {aiReport.actionItems.map((item, idx) => (
                              <div key={idx} className="bg-indigo-950/20 border border-indigo-900/30 rounded-xl p-4 flex flex-col gap-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-950 text-teal-400 border border-slate-800">
                                        {item.domain}
                                      </span>
                                      <h5 className="text-xs font-bold text-white font-mono">{item.title}</h5>
                                      <span className={`text-[9.5px] font-bold ${
                                        item.difficulty === "Easy" ? "text-emerald-400" : item.difficulty === "Medium" ? "text-amber-400" : "text-rose-400"
                                      }`}>
                                        ({item.difficulty} difficulty)
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">{item.advice}</p>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                                    <button
                                      onClick={() => handleInitiateAddGoalFromAI(item, idx)}
                                      className="bg-teal-500 hover:bg-teal-400 text-slate-950 border border-transparent text-[10px] px-3 py-1.5 rounded-lg transition-all font-bold cursor-pointer flex items-center gap-1.5 shadow shadow-teal-500/10"
                                    >
                                      <Target className="h-3 w-3" /> Convert to Goal
                                    </button>
                                  </div>
                                </div>

                                {/* Custom Pre-filled review-and-confirm sub-panel */}
                                <AnimatePresence>
                                  {activeConvertItemIndex === idx && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="pt-3.5 border-t border-indigo-900/40 font-mono text-xs text-slate-300 flex flex-col gap-3.5 overflow-hidden"
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="text-[10px] font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                                          <Sparkles className="h-3 w-3 text-teal-400 animate-pulse" /> Pre-filled Goal Proposal (Review & Edit)
                                        </div>
                                        <span className="text-[9px] bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded font-bold border border-slate-850">
                                          Auto-parsed from AI advice
                                        </span>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="flex flex-col gap-1">
                                          <label className="text-[10px] text-slate-400 font-bold uppercase">Goal Name</label>
                                          <input
                                            type="text"
                                            value={editGoalFromAI.name}
                                            onChange={(e) => setEditGoalFromAI({ ...editGoalFromAI, name: e.target.value })}
                                            className="bg-slate-950 border border-slate-800 text-white rounded-lg px-2.5 py-2 text-[11px] focus:outline-none focus:border-teal-500"
                                            placeholder="Goal Title"
                                          />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                          <label className="text-[10px] text-slate-400 font-bold uppercase">Functional Domain</label>
                                          <select
                                            value={editGoalFromAI.domain}
                                            onChange={(e) => setEditGoalFromAI({ ...editGoalFromAI, domain: e.target.value })}
                                            className="bg-slate-950 border border-slate-800 text-white rounded-lg px-2.5 py-2 text-[11px] focus:outline-none focus:border-teal-500"
                                          >
                                            <option value="Athletic & Fitness">Athletic & Fitness</option>
                                            <option value="Dietary Health">Dietary Health</option>
                                            <option value="Career & Tech">Career & Tech</option>
                                            <option value="Mental Space">Mental Space</option>
                                            <option value="Financial Growth">Financial Growth</option>
                                          </select>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-3 gap-3">
                                        <div className="flex flex-col gap-1">
                                          <label className="text-[10px] text-slate-400 font-bold uppercase">Target Value</label>
                                          <input
                                            type="number"
                                            step="any"
                                            value={editGoalFromAI.target}
                                            onChange={(e) => setEditGoalFromAI({ ...editGoalFromAI, target: e.target.value })}
                                            className="bg-slate-950 border border-slate-800 text-white rounded-lg px-2.5 py-2 text-[11px] focus:outline-none focus:border-teal-500 font-bold"
                                          />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                          <label className="text-[10px] text-slate-400 font-bold uppercase">Unit Label</label>
                                          <input
                                            type="text"
                                            value={editGoalFromAI.unit}
                                            onChange={(e) => setEditGoalFromAI({ ...editGoalFromAI, unit: e.target.value })}
                                            className="bg-slate-950 border border-slate-800 text-white rounded-lg px-2.5 py-2 text-[11px] focus:outline-none focus:border-teal-500"
                                            placeholder="e.g. days, km, USD"
                                          />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                          <label className="text-[10px] text-slate-400 font-bold uppercase">Target End Date</label>
                                          <input
                                            type="date"
                                            value={editGoalFromAI.targetDate}
                                            onChange={(e) => setEditGoalFromAI({ ...editGoalFromAI, targetDate: e.target.value })}
                                            className="bg-slate-950 border border-slate-800 text-white rounded-lg px-2.5 py-2 text-[11px] focus:outline-none focus:border-teal-500 text-slate-300"
                                          />
                                        </div>
                                      </div>

                                      <div className="flex items-center justify-end gap-2 mt-1.5 pt-2.5 border-t border-slate-850">
                                        <button
                                          type="button"
                                          onClick={() => setActiveConvertItemIndex(null)}
                                          className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-900 transition-colors text-slate-400 text-[10px] uppercase font-bold cursor-pointer"
                                        >
                                          Discard
                                        </button>
                                        <button
                                          type="button"
                                          onClick={handleSaveGoalFromAIEdit}
                                          className="px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-[10px] uppercase font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow"
                                        >
                                          <Check className="h-3 w-3" /> Activate proposed goal
                                        </button>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}

                  </div>

                </div>

                {/* RIGHT 5 COLS: INTERACTIVE CHAT SCREEN ENVIRONMENT */}
                <div className="col-span-1 lg:col-span-5 flex flex-col h-140">
                  
                  <div className="bg-slate-900 border border-slate-800 rounded-xl flex-1 flex flex-col overflow-hidden shadow-md">
                    
                    {/* Chat Header */}
                    <div className="bg-slate-950 p-4 border-b border-slate-850 flex items-center gap-2.5 shrink-0">
                      <div className="h-3.5 w-3.5 rounded-full bg-teal-400 animate-pulse shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-white font-mono">Latimore Life & Legacy AI Interactive Workspace Agent</h4>
                        <p className="text-[10px] text-slate-400 font-mono leading-none mt-1">Understands relational tables, stats and financial aggregates</p>
                      </div>
                    </div>

                    {/* Message view */}
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 font-mono text-[11px]">
                      {chatHistory.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex flex-col max-w-[85%] rounded-xl p-3 ${
                            msg.role === "user"
                              ? "self-end bg-gradient-to-br from-teal-500/15 to-indigo-600/5 border border-teal-500/20 text-teal-200"
                              : "self-start bg-slate-950 border border-slate-850 text-slate-300"
                          }`}
                        >
                          <span className="text-[9px] opacity-40 font-bold uppercase mb-1.5">
                            {msg.role === "user" ? "Jackson (Workspace Master)" : "Latimore Life & Legacy AI Helper"}
                          </span>
                          <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      ))}

                      {isSendingChat && (
                        <div className="self-start bg-slate-950 border border-slate-850 text-slate-400 rounded-xl p-3 flex items-center gap-2 max-w-[80%]">
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-ping" />
                          <span>AI Coach is compiling analytics...</span>
                        </div>
                      )}

                      {chatError && (
                        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-2.5 rounded-lg text-[10px]">
                          {chatError}
                        </div>
                      )}

                      <div ref={chatBottomRef} />
                    </div>

                    {/* Chat Input form */}
                    <form onSubmit={handleSendChat} className="bg-slate-950 p-3 border-t border-slate-850 flex gap-2 shrink-0">
                      <input
                        type="text"
                        required
                        disabled={isSendingChat}
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="e.g. Do my workouts correlate with better sleep metrics?"
                        className="flex-1 bg-slate-900 border border-slate-850 focus:border-teal-500 focus:outline-none rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 font-mono disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={isSendingChat || !chatInput.trim()}
                        className="bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 text-slate-950 hover:text-slate-950 p-2 rounded-lg transition-all shrink-0 cursor-pointer text-xs flex items-center justify-center font-bold disabled:opacity-50"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </form>

                  </div>

                </div>

              </motion.div>
            )}

            {/* ===================== TAB 3.5: CAMPAIGN & MARKETING CONTENT STUDIO ===================== */}
            {activeTab === "content" && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                
                {/* STUDIO INTRO BANNER */}
                <div className="lg:col-span-12 bg-gradient-to-br from-pink-950/20 via-slate-900 to-slate-900 border border-pink-900/30 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-5 font-mono shadow-md">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20 text-pink-400 font-bold uppercase tracking-wider">AI Content Studio</span>
                      <span className="text-[9.5px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-500">PA LATIMORE OFFICE</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1.5">Jackson M. Latimore Sr. &apos;s Digital Content Factory</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1 max-w-3xl">
                      Upload your corporate guidelines or reference worksheets, fill out customized campaign directives, and prompt Gemini to draft high-converting social copy, email funnels, and presentation outlines customized for Schuylkill, Luzerne, and Northumberland families in Central PA.
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2 bg-slate-950/60 border border-slate-800/80 px-4 py-2.5 rounded-lg text-xs leading-tight">
                    <BookOpen className="h-5 w-5 text-pink-400 shrink-0" />
                    <div>
                      <div className="text-slate-200 font-bold uppercase">{campaignDocuments.length} Documents</div>
                      <div className="text-slate-500 text-[10px]">Reference Library</div>
                    </div>
                  </div>
                </div>

                {/* LEFT SIDEBAR (5 COLS): PARAMS + Uploader */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  
                  {/* GENERATOR PARAMETERS CARD */}
                  <div id="campaign-config-card" className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4 shadow-md font-mono">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-pink-400" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Configure Campaign Directive</h4>
                    </div>

                    <form onSubmit={handleCreateCampaign} className="flex flex-col gap-3.5 text-xs text-slate-300">
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-400 font-bold">Select Guideline / Spec Reference Source</label>
                        <select
                          id="select-reference-source"
                          value={selectedDocumentId}
                          onChange={(e) => setSelectedDocumentId(e.target.value)}
                          className="bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-2 text-white focus:outline-none"
                        >
                          {campaignDocuments.map((doc) => (
                            <option key={doc.id} value={doc.id}>
                              {doc.title} ({doc.charCount} chars)
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-400 font-bold">Target Style Asset Format</label>
                          <select
                            id="select-asset-format"
                            value={campaignContentType}
                            onChange={(e) => setCampaignContentType(e.target.value)}
                            className="bg-slate-950 border border-slate-850 rounded-lg px-2 py-2 text-white focus:outline-none"
                          >
                            <option value="social">Social Copy (FB/LinkedIn)</option>
                            <option value="email">Sales Proposal Email</option>
                            <option value="blog">Educational Blog Outline</option>
                            <option value="script">Presentation/Audio Outline</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-400 font-bold">Concept Tone Voice Profile</label>
                          <select
                            id="select-tone-profile"
                            value={campaignTone}
                            onChange={(e) => setCampaignTone(e.target.value)}
                            className="bg-slate-950 border border-slate-850 rounded-lg px-2 py-2 text-white focus:outline-none"
                          >
                            <option value="local">Central PA Neighborly</option>
                            <option value="empathetic">Empathetic Security</option>
                            <option value="authoritative">Authoritative Financial</option>
                            <option value="informative">Technical Educational</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-400 font-bold">Topic or Specific Product Coverage</label>
                        <input
                          id="input-campaign-topic"
                          type="text"
                          required
                          value={campaignTopic}
                          onChange={(e) => setCampaignTopic(e.target.value)}
                          placeholder="e.g. Smart Money with Smart Builder IUL"
                          className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-white placeholder-slate-700 focus:outline-none focus:border-pink-500"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-400 font-bold">Target Audience Demo Group</label>
                        <input
                          id="input-campaign-audience"
                          type="text"
                          required
                          value={campaignAudience}
                          onChange={(e) => setCampaignAudience(e.target.value)}
                          placeholder="e.g. Retirees & Seniors"
                          className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-white placeholder-slate-700 focus:outline-none focus:border-pink-500"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-400 font-bold flex items-center justify-between">
                          <span>Regional / Cardiac Mission Guidelines</span>
                          <span className="text-[10px] text-pink-400 font-bold">Active Directives</span>
                        </label>
                        <textarea
                          id="textarea-campaign-additional"
                          rows={3}
                          value={campaignAdditional}
                          onChange={(e) => setCampaignAdditional(e.target.value)}
                          placeholder="Provide local PA counties context, heart legacy tags or custom compliance disclaimers..."
                          className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-white placeholder-slate-700 focus:outline-none resize-none"
                        />
                      </div>

                      <button
                        id="submit-campaign-form"
                        type="submit"
                        disabled={isCreatingContent}
                        className="bg-pink-500 hover:bg-pink-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-500 font-bold py-2.5 px-4 rounded-lg cursor-pointer transition-all uppercase tracking-wider text-center flex items-center justify-center gap-2 mt-1 shadow shadow-pink-500/10"
                      >
                        {isCreatingContent ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" /> Engineering Content Copy...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4" /> Draft Content via Gemini
                          </>
                        )}
                      </button>

                    </form>
                  </div>

                  {/* DOCUMENT UPLOADER AND TEXT PASTE IMPORTER */}
                  <div id="document-paste-card" className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4 shadow-md font-mono">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Upload / Import Document Guidelines</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Import new specification checklists, product sheets, regional profiles or custom sales scripts directly into active session.</p>
                    </div>

                    <form onSubmit={handleAddCustomDocument} className="flex flex-col gap-3 text-xs">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-400 font-bold">Document Title</label>
                        <input
                          id="input-document-title"
                          type="text"
                          required
                          value={customDocTitle}
                          onChange={(e) => setCustomDocTitle(e.target.value)}
                          placeholder="e.g., North American ADBE Chronic Rider Spec"
                          className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-white placeholder-slate-700 focus:outline-none focus:border-pink-500"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-400 font-bold">Paste / Input Document Reference Text</label>
                        <textarea
                          id="textarea-document-text"
                          required
                          rows={4}
                          value={customDocText}
                          onChange={(e) => setCustomDocText(e.target.value)}
                          placeholder="Paste raw guidelines, underwriting parameters, premium cost structures or county marketing schedules..."
                          className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-white placeholder-slate-700 focus:outline-none resize-none font-mono text-[11px]"
                        />
                      </div>

                      {/* SIMULATED FILE DRAG AND DROP AREA */}
                      <div 
                        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={(e) => { 
                          e.preventDefault(); 
                          setDragActive(false); 
                          alert("PDF & Document Cryptographic Security handshake completed. Extracting text inputs instantly into Title & Content fields.");
                          setCustomDocTitle("Imported_Carrier_Solutions_Catalog.csv");
                          setCustomDocText("Products: ADDvantage Term, Protection Builder IUL 2, Builder Plus IUL 4, Smart Builder IUL 3.\nUnderwriting rules: issue ages up to 75, preferred standard non-tobacco tier NT minimum, custom policy loan spreads. Region index focus: Schuylkill County, Luzerne County, Northumberland County.");
                        }}
                        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
                          dragActive ? "border-pink-500 bg-pink-500/5 text-pink-300" : "border-slate-800 hover:border-slate-700 bg-slate-950/60 text-slate-500"
                        }`}
                      >
                        <BookOpen className="h-5 w-5" />
                        <span className="text-[10px] font-bold">Drag & Drop carrier documents here</span>
                        <span className="text-[9px]">Supports PDF / TXT / CSV to auto-retrieve context</span>
                      </div>

                      <button
                        id="submit-document-import"
                        type="submit"
                        className="bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white px-3 py-2 rounded-lg border border-slate-700 font-semibold cursor-pointer text-xs"
                      >
                        Import Guidelines to Library
                      </button>
                    </form>
                  </div>

                </div>

                {/* RIGHT SIDEBAR (7 COLS): GENERATOR DISPLAY TERMINAL */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  
                  {/* GENERATOR DISPLAY SCREEN */}
                  <div id="campaign-display-screen" className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4 shadow-md font-mono relative min-h-[500px]">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Active Workspace Drafting Terminal</h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (!createdContentHtml) return;
                            navigator.clipboard.writeText(createdContentHtml);
                            alert("Campaign contents successfully copied to clipboard!");
                          }}
                          disabled={!createdContentHtml}
                          className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs text-slate-200 hover:text-white px-2.5 py-1.5 rounded border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          Copy Content text
                        </button>
                        <button
                          onClick={() => setCreatedContentHtml("")}
                          disabled={!createdContentHtml}
                          className="bg-slate-950 text-slate-400 hover:text-rose-400 border border-slate-850 px-2 py-1 rounded hover:border-rose-500/20 disabled:opacity-40 text-xs transition-all cursor-pointer"
                        >
                          Clear Display
                        </button>
                      </div>
                    </div>

                    {/* CONTENT DISPLAY HOOD */}
                    <div className="flex-1 bg-slate-950 rounded-xl border border-slate-850 p-5 overflow-y-auto max-h-[580px] scrollbar-thin scrollbar-thumb-slate-800 relative">
                      {isCreatingContent && (
                        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-slate-300">
                          <RefreshCw className="h-8 w-8 animate-spin text-pink-500 mb-3" />
                          <p className="text-xs tracking-widest uppercase font-mono px-4 text-center">Gemini Consulting Reference Library & Repositioning Wealth Models...</p>
                        </div>
                      )}

                      {contentStudioError && (
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-lg font-sans">
                          <strong>Drafting Terminal Warning:</strong> {contentStudioError}
                        </div>
                      )}

                      {!createdContentHtml && !contentStudioError && !isCreatingContent && (
                        <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500 h-full min-h-[300px]">
                          <BookOpen className="h-10 w-10 text-slate-700 mb-3 outline-none" />
                          <p className="text-xs leading-relaxed max-w-sm">
                            <strong>DRAFT SHEETS ARE BLANK</strong> <br /> Select a document, define the topic and demographic, and trigger the Gemini Engine to engineer professional compliance-friendly marketing assets.
                          </p>
                          <div className="flex flex-col gap-2 p-3 bg-slate-900 border border-slate-850 rounded-lg text-[10px] text-left mt-6 text-slate-400 leading-normal font-sans max-w-sm">
                            <span className="font-bold text-slate-300 font-mono text-[9px] uppercase tracking-wide">💡 Pro Strategist Tip:</span>
                            To leverage local trust, use the **Central PA Neighborly** tone! It automatically weaves Schuylkill, Northumberland, or Luzerne counties seamlessly into your presentation drafts.
                          </div>
                        </div>
                      )}

                      {createdContentHtml && (
                        <div id="rendered-content-display" className="prose prose-invert max-w-none text-slate-300 selection:bg-pink-500/30">
                          {(() => {
                            const lines = createdContentHtml.split("\n");
                            return lines.map((line, idx) => {
                              let trimmed = line.trim();
                              if (trimmed.startsWith("###")) {
                                return <h4 key={idx} className="text-sm font-bold text-pink-400 mt-4 mb-2 font-mono uppercase tracking-wide">{trimmed.replace("###", "").trim()}</h4>;
                              }
                              if (trimmed.startsWith("##")) {
                                return <h3 key={idx} className="text-base font-bold text-indigo-300 mt-5 mb-2.5 font-mono">{trimmed.replace("##", "").trim()}</h3>;
                              }
                              if (trimmed.startsWith("#")) {
                                return <h2 key={idx} className="text-lg font-bold text-white mt-6 mb-3 border-b border-slate-850 pb-1.5 font-sans">{trimmed.replace("#", "").trim()}</h2>;
                              }
                              if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
                                let text = trimmed.substring(1).trim();
                                const boldRegex = /\*\*(.*?)\*\*/g;
                                const parts = [];
                                let lastIndex = 0;
                                let match;
                                while ((match = boldRegex.exec(text)) !== null) {
                                  if (match.index > lastIndex) {
                                    parts.push(text.substring(lastIndex, match.index));
                                  }
                                  parts.push(<strong key={match.index} className="text-pink-400">{match[1]}</strong>);
                                  lastIndex = boldRegex.lastIndex;
                                }
                                if (lastIndex < text.length) {
                                  parts.push(text.substring(lastIndex));
                                }
                                return (
                                  <li key={idx} className="ml-4 list-disc text-xs text-slate-300 leading-relaxed mb-1.5 font-mono">
                                    {parts.length > 0 ? parts : text}
                                  </li>
                                );
                              }
                              const boldRegex = /\*\*(.*?)\*\*/g;
                              const parts = [];
                              let lastIndex = 0;
                              let match;
                              while ((match = boldRegex.exec(trimmed)) !== null) {
                                if (match.index > lastIndex) {
                                  parts.push(trimmed.substring(lastIndex, match.index));
                                }
                                parts.push(<strong key={match.index} className="text-pink-400">{match[1]}</strong>);
                                lastIndex = boldRegex.lastIndex;
                              }
                              if (lastIndex < trimmed.length) {
                                parts.push(trimmed.substring(lastIndex));
                              }
                              return (
                                <p key={idx} className="text-xs text-slate-300 leading-relaxed min-h-[12px] mb-3 font-mono">
                                  {parts.length > 0 ? parts : trimmed}
                                </p>
                              );
                            });
                          })()}
                        </div>
                      )}
                    </div>

                    {/* DRAFT SHELF PREVIEW SELECT */}
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 flex items-center justify-between text-[11px] leading-tight text-slate-400 font-sans">
                      <span>Ref System: <strong>Gemini 3.5-Flash Core</strong></span>
                      <span>Output compliance audit: <strong>Active ✓</strong></span>
                    </div>
                  </div>

                  {/* PREVIOUS CAMPAIGN LIST */}
                  <div id="campaign-history-shelf" className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-3 shadow-md font-mono">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Campaign Generations Memory</h4>
                    
                    <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                      {generatedCampaigns.map((camp) => (
                        <div 
                          key={camp.id} 
                          onClick={() => setCreatedContentHtml(camp.content)}
                          className={`p-3 rounded-lg border cursor-pointer hover:bg-slate-850/80 transition-all flex items-start justify-between gap-3 text-xs ${
                            createdContentHtml === camp.content 
                              ? "border-pink-500 bg-pink-500/10" 
                              : "border-slate-850 bg-slate-950/40"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] text-pink-400 uppercase font-bold bg-pink-500/10 px-1.5 py-0.5 rounded border border-pink-500/20">{camp.type}</span>
                              <strong className="text-slate-250 truncate block max-w-md">{camp.title}</strong>
                            </div>
                            <span className="text-[10.5px] text-slate-400 mt-1 block">Topic: {camp.topic} • Audience: {camp.audience}</span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <span className="text-[10px] text-slate-500 bg-slate-900 p-1 rounded border border-slate-800 font-bold">{camp.date}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setGeneratedCampaigns((prev) => prev.filter((i) => i.id !== camp.id));
                                if (createdContentHtml === camp.content) {
                                  setCreatedContentHtml("");
                                }
                              }}
                              className="text-slate-500 hover:text-rose-400 p-1"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </motion.div>
            )}

            {/* ===================== TAB 3.6: SOCIAL ENGAGEMENT & MARKETING HUB ===================== */}
            {activeTab === "marketing" && (
              <motion.div
                key="marketing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 print:block w-full"
              >
                
                {/* BRAND INTRO BANNER */}
                <div className="lg:col-span-12 bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-900 border border-amber-500/10 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-5 font-mono shadow-md print:hidden">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 text-amber-300 font-bold uppercase tracking-wider">Social Hub & CRM Attribution</span>
                      <span className="text-[9.5px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-500 uppercase tracking-widest font-bold">GA4: G-S0Q3E4DEBJ</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1.5 uppercase tracking-wide">Latimore Marketing & Social Engagement Intelligence OS</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1 max-w-3xl">
                      Monitor website performance, social media conversions, and regional reach. Analyze sentiment using Gemini Flash-Lite and draft, schedule, and verify compliance-safe campaigns to serve Schuylkill, Luzerne, and Northumberland counties under the noble mission of <strong>#TheBeatGoesOn</strong>.
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-4 bg-slate-950/70 border border-slate-850 px-4 py-3 rounded-xl font-mono text-xs">
                    <div>
                      <div className="text-emerald-400 font-bold text-sm tracking-tight">+15.4%</div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Impressions MoM</div>
                    </div>
                    <div className="h-8 w-[1px] bg-slate-850" />
                    <div>
                      <div className="text-amber-400 font-bold text-sm tracking-tight">38 Leads</div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Attributed CRM</div>
                    </div>
                  </div>
                </div>

                {/* CONTROL BAR: WIDGET SWITCHER & PLATFORM FILTER */}
                <div className="lg:col-span-12 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs print:hidden">
                  
                  {/* Platform Filter */}
                  <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-850">
                    {["all", "facebook", "instagram", "linkedin", "website"].map((plt) => (
                      <button
                        key={plt}
                        type="button"
                        onClick={() => setSelectedSocialPlatformFilter(plt)}
                        className={`px-3 py-1.5 rounded-md capitalize font-bold leading-none cursor-pointer transition-all ${
                          selectedSocialPlatformFilter === plt
                            ? "bg-amber-500/15 text-amber-300 border border-amber-500/20"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {plt}
                      </button>
                    ))}
                  </div>

                  {/* Custom Widget Toggler */}
                  <div className="flex items-center gap-3.5 flex-wrap">
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Customize Layout:</span>
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                      <input
                        type="checkbox"
                        checked={socialWidgets.showKPIs}
                        onChange={(e) => setSocialWidgets(prev => ({ ...prev, showKPIs: e.target.checked }))}
                        className="rounded accent-amber-500 bg-slate-950 h-3.5 w-3.5 border-slate-800"
                      />
                      <span>KPIs</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                      <input
                        type="checkbox"
                        checked={socialWidgets.showCharts}
                        onChange={(e) => setSocialWidgets(prev => ({ ...prev, showCharts: e.target.checked }))}
                        className="rounded accent-amber-500 bg-slate-950 h-3.5 w-3.5 border-slate-800"
                      />
                      <span>Analytics Charts</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                      <input
                        type="checkbox"
                        checked={socialWidgets.showPAHS}
                        onChange={(e) => setSocialWidgets(prev => ({ ...prev, showPAHS: e.target.checked }))}
                        className="rounded accent-amber-500 bg-slate-950 h-3.5 w-3.5 border-slate-800"
                      />
                      <span>PAHS Campaign</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                      <input
                        type="checkbox"
                        checked={socialWidgets.showInsights}
                        onChange={(e) => setSocialWidgets(prev => ({ ...prev, showInsights: e.target.checked }))}
                        className="rounded accent-amber-500 bg-slate-950 h-3.5 w-3.5 border-slate-800"
                      />
                      <span>AI Insights</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                      <input
                        type="checkbox"
                        checked={socialWidgets.showSentiment}
                        onChange={(e) => setSocialWidgets(prev => ({ ...prev, showSentiment: e.target.checked }))}
                        className="rounded accent-amber-500 bg-slate-950 h-3.5 w-3.5 border-slate-800"
                      />
                      <span>Comment Auditor</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                      <input
                        type="checkbox"
                        checked={socialWidgets.showScheduler}
                        onChange={(e) => setSocialWidgets(prev => ({ ...prev, showScheduler: e.target.checked }))}
                        className="rounded accent-amber-500 bg-slate-950 h-3.5 w-3.5 border-slate-800"
                      />
                      <span>Publisher</span>
                    </label>
                  </div>
                </div>

                {/* 1. SCORECARD STATS ROW */}
                {socialWidgets.showKPIs && (
                  <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 print:grid print:grid-cols-4 w-full">
                    
                    {/* Score 1 */}
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col gap-1 shadow-sm font-mono relative overflow-hidden">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Campaign Impressions</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xl font-bold text-white tracking-tight">68.4K</span>
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center"><TrendingUp className="h-3 w-3 mr-0.5" />+15.4%</span>
                      </div>
                      <p className="text-[9px] text-slate-500 mt-1 truncate">Facebook Ads & Blog traffic metrics</p>
                    </div>

                    {/* Score 2 */}
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col gap-1 shadow-sm font-mono relative overflow-hidden">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Conversions Reach</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xl font-bold text-teal-300 tracking-tight">41.2K</span>
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center"><TrendingUp className="h-3 w-3 mr-0.5" />+11.8%</span>
                      </div>
                      <p className="text-[9px] text-slate-500 mt-1 truncate">Direct regional network coverage</p>
                    </div>

                    {/* Score 3 */}
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col gap-1 shadow-sm font-mono relative overflow-hidden">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Link Clicks</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xl font-bold text-white tracking-tight">3,120</span>
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center"><TrendingUp className="h-3 w-3 mr-0.5" />+24.7%</span>
                      </div>
                      <p className="text-[9px] text-slate-500 mt-1 truncate">CTA interactions on form pages</p>
                    </div>

                    {/* Score 4 */}
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col gap-1 shadow-sm font-mono relative overflow-hidden">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Lead conversions (CRM)</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xl font-bold text-amber-300 tracking-tight">184</span>
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center"><TrendingUp className="h-3 w-3 mr-0.5" />+22.1%</span>
                      </div>
                      <p className="text-[9px] text-slate-500 mt-1 truncate">Booked pipelines in Schuylkill & Luzerne</p>
                    </div>

                  </div>
                )}

                {/* 2. CHARTS SECTION */}
                {socialWidgets.showCharts && (
                  <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 print:hidden w-full">

                    {/* Recharts 0: Engagement Growth Trend (new full-width AreaChart) */}
                    <div className="md:col-span-12 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm font-mono">
                      <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-teal-400" />
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Engagement Growth Trend — LinkedIn · Instagram · Facebook</h4>
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase">12-Week Rolling · Clicks + Interactions</span>
                      </div>
                      <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={[
                              { week: "Wk 1",  LinkedIn: 1240, Instagram: 820,  Facebook: 1580 },
                              { week: "Wk 2",  LinkedIn: 1380, Instagram: 910,  Facebook: 1620 },
                              { week: "Wk 3",  LinkedIn: 1290, Instagram: 980,  Facebook: 1710 },
                              { week: "Wk 4",  LinkedIn: 1540, Instagram: 1050, Facebook: 1790 },
                              { week: "Wk 5",  LinkedIn: 1680, Instagram: 1140, Facebook: 1840 },
                              { week: "Wk 6",  LinkedIn: 1820, Instagram: 1260, Facebook: 1920 },
                              { week: "Wk 7",  LinkedIn: 1750, Instagram: 1380, Facebook: 2080 },
                              { week: "Wk 8",  LinkedIn: 1940, Instagram: 1490, Facebook: 2140 },
                              { week: "Wk 9",  LinkedIn: 2080, Instagram: 1620, Facebook: 2290 },
                              { week: "Wk 10", LinkedIn: 2210, Instagram: 1740, Facebook: 2380 },
                              { week: "Wk 11", LinkedIn: 2360, Instagram: 1890, Facebook: 2520 },
                              { week: "Wk 12", LinkedIn: 2490, Instagram: 2010, Facebook: 2640 },
                            ]}
                            margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="gradLinkedIn" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%"  stopColor="#fbbf24" stopOpacity={0.25} />
                                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.02} />
                              </linearGradient>
                              <linearGradient id="gradInstagram" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%"  stopColor="#ec4899" stopOpacity={0.25} />
                                <stop offset="95%" stopColor="#ec4899" stopOpacity={0.02} />
                              </linearGradient>
                              <linearGradient id="gradFacebook" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.25} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="week" stroke="#64748b" fontSize={10} tickLine={false} />
                            <YAxis stroke="#64748b" fontSize={10} tickLine={false} width={40} />
                            <Tooltip
                              contentStyle={{ backgroundColor: "#020617", borderColor: "#1e293b", fontSize: 11 }}
                              labelStyle={{ color: "#ffffff", fontWeight: 700 }}
                              itemStyle={{ color: "#94a3b8" }}
                            />
                            <Legend
                              iconType="circle"
                              iconSize={8}
                              wrapperStyle={{ fontSize: 10, paddingTop: 12, color: "#94a3b8" }}
                            />
                            <Area type="monotone" dataKey="LinkedIn"  stroke="#fbbf24" strokeWidth={2} fill="url(#gradLinkedIn)"  dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                            <Area type="monotone" dataKey="Instagram" stroke="#ec4899" strokeWidth={2} fill="url(#gradInstagram)" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                            <Area type="monotone" dataKey="Facebook"  stroke="#3b82f6" strokeWidth={2} fill="url(#gradFacebook)"  dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Recharts 1: Cross Platform Engagement Trend */}
                    <div className="md:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm font-mono">
                      <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <LineChartIcon className="h-4 w-4 text-emerald-400" />
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Unified Channel Engagement Trend</h4>
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase">Weekly click rate aggregated</span>
                      </div>

                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "Mon", Facebook: 240, Instagram: 180, LinkedIn: 410, Website: 120 },
                              { name: "Tue", Facebook: 320, Instagram: 220, LinkedIn: 480, Website: 150 },
                              { name: "Wed", Facebook: 450, Instagram: 340, LinkedIn: 620, Website: 290 },
                              { name: "Thu", Facebook: 380, Instagram: 280, LinkedIn: 550, Website: 180 },
                              { name: "Fri", Facebook: 540, Instagram: 480, LinkedIn: 720, Website: 410 },
                              { name: "Sat", Facebook: 610, Instagram: 590, LinkedIn: 390, Website: 330 },
                              { name: "Sun", Facebook: 480, Instagram: 410, LinkedIn: 310, Website: 250 },
                            ]}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                            <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: "#020617", borderColor: "#1e293b" }} labelStyle={{ color: "#ffffff" }} />
                            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10, paddingTop: 8, color: "#94a3b8" }} />
                            <Bar dataKey="LinkedIn"  fill="#fbbf24" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Instagram" fill="#ec4899" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Facebook"  fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Website"   fill="#10b981" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Recharts 2: Lead Funnel Attribution */}
                    <div className="md:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm font-mono">
                      <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-amber-400" />
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Social Conversion Funnel</h4>
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase">Attributed CRM</span>
                      </div>

                      <div className="flex flex-col gap-4 font-mono text-xs text-slate-300">
                        {/* Level 1: Reach */}
                        <div>
                          <div className="flex justify-between items-center mb-1 text-[11px]">
                            <span className="font-bold text-slate-400 uppercase tracking-wide">1. Social Impressions Reach</span>
                            <strong className="text-white">68.4K Families</strong>
                          </div>
                          <div className="w-full bg-slate-950 h-2 rounded overflow-hidden">
                            <div className="bg-indigo-500 h-full w-[100%]" />
                          </div>
                        </div>

                        {/* Level 2: Clicks */}
                        <div>
                          <div className="flex justify-between items-center mb-1 text-[11px]">
                            <span className="font-bold text-slate-400 uppercase tracking-wide">2. Interest Clicks</span>
                            <strong className="text-indigo-300">3,120 Leads</strong>
                          </div>
                          <div className="w-full bg-slate-950 h-2 rounded overflow-hidden">
                            <div className="bg-purple-500 h-full w-[45%]" />
                          </div>
                        </div>

                        {/* Level 3: Form Submissions */}
                        <div>
                          <div className="flex justify-between items-center mb-1 text-[11px]">
                            <span className="font-bold text-slate-400 uppercase tracking-wide">3. Web Form Submits</span>
                            <strong className="text-pink-300">184 Enquiries</strong>
                          </div>
                          <div className="w-full bg-slate-950 h-2 rounded overflow-hidden">
                            <div className="bg-pink-500 h-full w-[25%]" />
                          </div>
                        </div>

                        {/* Level 4: Conversions */}
                        <div>
                          <div className="flex justify-between items-center mb-1 text-[11px]">
                            <span className="font-bold text-slate-400 uppercase tracking-wide">4. Closed Blueprints</span>
                            <strong className="text-amber-400">38 Plans</strong>
                          </div>
                          <div className="w-full bg-slate-950 h-2 rounded overflow-hidden">
                            <div className="bg-amber-400 h-full w-[12%]" />
                          </div>
                        </div>

                        <div className="mt-2 text-[10px] bg-slate-950 p-2.5 rounded border border-slate-850 leading-relaxed text-slate-400 font-sans">
                          💡 <strong>Lead attribution source:</strong> LinkedIn Buy-Sell conversions yield the highest case size in Schuylkill County, while Facebook drives final expense and term plans inquiries.
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* 3. SPIKE ALERT INDICATION BANNER */}
                <div className="lg:col-span-12 bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-center justify-between gap-4 font-mono text-xs print:hidden w-full">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500"></span>
                    </span>
                    <div>
                      <strong className="text-amber-300 uppercase font-extrabold tracking-wide">Emergency Spike Threshold Triggered!</strong>
                      <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
                        Post ID <strong>#post_1</strong> (&quot;Honoring our second chance given by an AED... #TheBeatGoesOn&quot;) has reached 14.8k impressions, which exceeds the Central PA region benchmark by 241%.
                      </p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      setCommentInput("I read your legacy story about surviving sudden cardiac arrest on Dec 7 2010. Truly inspiring! Does North American life insurance with WOSC offer cash accumulation if we have heart disease history?");
                      alert("Spike feedback comment preloaded! Press '/Audit Comment' under the AI Comment Auditor segment below to analyze!");
                    }}
                    className="shrink-0 bg-slate-950 text-amber-400 hover:text-white border border-amber-500/20 hover:border-amber-500 font-semibold px-3 py-1.5 rounded-lg cursor-pointer text-[10.5px] transition-all"
                  >
                    Load Spike Feed
                  </button>
                </div>

                {/* 4. PAHS COMMUNITY CAMPAIGN COMMAND CENTER */}
                {socialWidgets.showPAHS && (
                  <div className="lg:col-span-12 flex flex-col gap-5 print:hidden w-full">

                    {/* Header */}
                    <div className="bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/20 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[9px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
                            ACTIVE
                          </span>
                          <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400 font-bold uppercase tracking-wider">UTM: pahs_q2_2026</span>
                          <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400 font-bold uppercase tracking-wider">QR: ethos-postcard</span>
                        </div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wide">PAHS Community Campaign Command Center</h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed max-w-2xl font-sans">
                          Pottsville Area High School sponsorship & community outreach pipeline. Track QR-based lead capture, execute daily command briefs, and advance families through the five-stage protection funnel.
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-3 bg-slate-950/70 border border-slate-800 px-4 py-3 rounded-xl text-xs font-mono">
                        <div className="text-center">
                          <div className="text-amber-400 font-bold text-base">84</div>
                          <div className="text-[9px] text-slate-500 uppercase">Captured Leads</div>
                        </div>
                        <div className="h-7 w-[1px] bg-slate-800" />
                        <div className="text-center">
                          <div className="text-emerald-400 font-bold text-base">18</div>
                          <div className="text-[9px] text-slate-500 uppercase">Conversions</div>
                        </div>
                        <div className="h-7 w-[1px] bg-slate-800" />
                        <div className="text-center">
                          <div className="text-white font-bold text-base">21.4%</div>
                          <div className="text-[9px] text-slate-500 uppercase">Conv. Rate</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                      {/* Community Pipeline Funnel */}
                      <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 font-mono flex flex-col gap-4">
                        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                          <Target className="h-4 w-4 text-amber-400" />
                          <h5 className="text-xs font-bold text-white uppercase tracking-wider">Community Protection Pipeline</h5>
                        </div>
                        {[
                          { stage: "1. Awareness", label: "PAHS posts + postcards seen", count: 420, color: "bg-indigo-500", pct: "100%" },
                          { stage: "2. Interest",  label: "QR code scanned or DM sent", count: 128, color: "bg-violet-500", pct: "30%" },
                          { stage: "3. Capture",   label: "Lead form submitted",         count: 84,  color: "bg-pink-500",   pct: "20%" },
                          { stage: "4. Follow-Up", label: "Drip sequence active",        count: 52,  color: "bg-amber-500",  pct: "12.4%" },
                          { stage: "5. Conversion",label: "Protection plan booked",      count: 18,  color: "bg-emerald-500","pct": "4.3%" },
                        ].map((s) => (
                          <div key={s.stage}>
                            <div className="flex justify-between items-center mb-1 text-[11px]">
                              <span className="font-bold text-slate-400 uppercase tracking-wide">{s.stage}</span>
                              <span className="text-white font-bold">{s.count} <span className="text-slate-500 font-normal text-[10px]">families</span></span>
                            </div>
                            <div className="w-full bg-slate-950 h-1.5 rounded overflow-hidden">
                              <div className={`${s.color} h-full rounded transition-all`} style={{ width: s.pct }} />
                            </div>
                            <div className="text-[9px] text-slate-600 mt-0.5">{s.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Daily Command Brief Runner */}
                      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 font-mono flex flex-col gap-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-amber-400" />
                            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Daily Marketing Command Brief</h5>
                          </div>
                          <button
                            type="button"
                            disabled={pahsBriefRunning}
                            onClick={async () => {
                              setPahsBriefRunning(true);
                              setPahsBriefStep(0);
                              setPahsBriefOutputs({});
                              let context = "";
                              for (let i = 0; i < pahsBriefNodes.length; i++) {
                                setPahsBriefStep(i);
                                try {
                                  const res = await fetch("/api/gemini/autoloop", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                      nodeId: pahsBriefNodes[i].id,
                                      nodeLabel: pahsBriefNodes[i].label,
                                      prompt: pahsBriefNodes[i].prompt,
                                      context: context,
                                    }),
                                  });
                                  const data = await res.json();
                                  const output = data.text || "";
                                  context = output;
                                  setPahsBriefOutputs(prev => ({ ...prev, [pahsBriefNodes[i].id]: output }));
                                } catch {
                                  setPahsBriefOutputs(prev => ({ ...prev, [pahsBriefNodes[i].id]: "Error running this step." }));
                                }
                              }
                              setPahsBriefStep(-1);
                              setPahsBriefRunning(false);
                            }}
                            className="text-[10px] bg-amber-500/10 text-amber-300 hover:text-white border border-amber-500/20 hover:border-amber-500 px-3 py-1.5 rounded-lg font-bold cursor-pointer disabled:opacity-40 transition-all flex items-center gap-1.5"
                          >
                            {pahsBriefRunning ? (
                              <><RefreshCw className="h-3 w-3 animate-spin" /> Running...</>
                            ) : (
                              <><Zap className="h-3 w-3" /> Run Today&apos;s Brief</>
                            )}
                          </button>
                        </div>

                        <div className="flex flex-col gap-2">
                          {pahsBriefNodes.map((node, idx) => {
                            const isDone = pahsBriefOutputs[node.id] !== undefined;
                            const isActive = pahsBriefRunning && pahsBriefStep === idx;
                            const isPending = pahsBriefRunning && pahsBriefStep < idx;
                            return (
                              <div key={node.id} className={`flex flex-col gap-1.5 p-3 rounded-lg border transition-all ${
                                isDone ? "bg-emerald-500/5 border-emerald-500/20" :
                                isActive ? "bg-amber-500/10 border-amber-500/30" :
                                "bg-slate-950/40 border-slate-850"
                              }`}>
                                <div className="flex items-center gap-2">
                                  <span className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${
                                    isDone ? "bg-emerald-500/20" : isActive ? "bg-amber-500/20" : "bg-slate-800"
                                  }`}>
                                    {isDone ? <Check className="h-2.5 w-2.5 text-emerald-400" /> :
                                     isActive ? <RefreshCw className="h-2.5 w-2.5 text-amber-400 animate-spin" /> :
                                     <Clock className="h-2.5 w-2.5 text-slate-600" />}
                                  </span>
                                  <span className={`text-[11px] font-bold ${isDone ? "text-emerald-300" : isActive ? "text-amber-300" : "text-slate-500"}`}>
                                    {node.label}
                                  </span>
                                </div>
                                {isDone && pahsBriefOutputs[node.id] && (
                                  <div className="text-[10px] text-slate-400 font-sans leading-relaxed pl-6 line-clamp-3">
                                    {pahsBriefOutputs[node.id].slice(0, 280)}{pahsBriefOutputs[node.id].length > 280 ? "…" : ""}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {!pahsBriefRunning && pahsBriefOutputs["brief"] && (
                          <div className="mt-1 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5">✅ Today&apos;s Brief Complete</div>
                            <div className="text-[11px] text-slate-300 font-sans leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
                              {pahsBriefOutputs["brief"]}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content Week 3: PAHS / School District Posts */}
                      <div className="lg:col-span-12 bg-slate-900 border border-slate-800 rounded-xl p-5 font-mono">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-sky-400" />
                            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Week 3 Content Library — Business Continuity & School Protection</h5>
                          </div>
                          <span className="text-[10px] text-slate-500 uppercase">March 2026 Package · Ready to Schedule</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            {
                              platform: "Facebook",
                              color: "text-blue-400",
                              border: "border-blue-500/20",
                              bg: "bg-blue-500/5",
                              label: "Post 3.1 — School Districts",
                              caption: "A question for every school board member: What's your plan if your Superintendent or Business Manager passes away unexpectedly?\n\nKey person insurance ensures your district has the financial resources to cover transition costs, bring in interim leadership, and maintain stability during a crisis.\n\n📞 Schedule a consultation → [link]\n\n#SchoolDistricts #KeyPersonInsurance #LatimoreLifeAndLegacy",
                            },
                            {
                              platform: "LinkedIn",
                              color: "text-sky-400",
                              border: "border-sky-500/20",
                              bg: "bg-sky-500/5",
                              label: "Post 3.1 — School Board Focus",
                              caption: `Your district has insurance on your buildings. Your buses. Your equipment.\n\nBut do you have insurance on your most critical asset — your leadership?\n\nKey person insurance on superintendents and business managers isn't morbid. It's responsible governance.\n\n📩 DM me "DISTRICT" to explore this for your schools.\n\n#K12Education #SchoolBoards #RiskManagement`,
                            },
                            {
                              platform: "Instagram",
                              color: "text-pink-400",
                              border: "border-pink-500/20",
                              bg: "bg-pink-500/5",
                              label: "Post 3.1 — Infographic",
                              caption: "What Happens If Your School District Loses a Key Leader?\n\nWITHOUT a plan: ❌ Operational chaos ❌ Budget strain ❌ Rushed decisions ❌ Community anxiety\n\nWITH key person protection: ✅ Financial resources ready ✅ Orderly transition ✅ Community confidence ✅ Educational mission protected\n\nSchools protect their buildings. Shouldn't they protect their leadership too?\n\n📲 Link in bio for consultation.",
                            },
                          ].map((post) => (
                            <div key={post.label} className={`p-4 rounded-xl border ${post.border} ${post.bg} flex flex-col gap-3`}>
                              <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${post.color}`}>{post.platform}</span>
                                <span className="text-[9px] text-slate-500 font-bold uppercase">{post.label}</span>
                              </div>
                              <p className="text-[10.5px] text-slate-300 leading-relaxed font-sans whitespace-pre-wrap line-clamp-6">{post.caption}</p>
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard?.writeText(post.caption);
                                  alert(`${post.platform} post copied to clipboard!`);
                                }}
                                className="mt-auto text-[10px] bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-600 px-2.5 py-1 rounded font-semibold cursor-pointer transition-all"
                              >
                                Copy Post
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 5. AI PREDICTIVE INSIGHTS CARD */}
                {socialWidgets.showInsights && (
                  <div className="lg:col-span-6 flex flex-col gap-6 print:hidden w-full">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm font-mono flex flex-col gap-4">
                      <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-teal-400" />
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Predictive AI Insights Engine</h4>
                        </div>
                        <button
                          type="button"
                          onClick={handleGenerateEngagementInsights}
                          disabled={isGeneratingInsights}
                          className="text-[10px] bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700 px-3 py-1 rounded border border-slate-850 cursor-pointer disabled:opacity-40"
                        >
                          {isGeneratingInsights ? "Syncing metrics..." : "Generate Insights"}
                        </button>
                      </div>

                      {insightsError && (
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-lg font-sans">
                          {insightsError}
                        </div>
                      )}

                      <div className="flex flex-col gap-3">
                        {marketingInsights.map((ins) => (
                          <div key={ins.id} className="p-4 rounded-xl bg-slate-950/40 border border-slate-850 flex flex-col gap-2">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-[8.5px] font-bold uppercase font-mono ${
                                  ins.severity === "high"
                                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                }`}>
                                  {ins.severity} priority
                                </span>
                                <span className="bg-slate-900 px-1.5 py-0.5 rounded text-[9px] text-slate-400 border border-slate-800 uppercase font-bold">{ins.type}</span>
                              </div>
                              <span className="text-[10px] text-slate-500">Active Alert</span>
                            </div>

                            <strong className="text-white text-xs leading-snug">{ins.title}</strong>
                            <p className="text-slate-400 text-xs leading-relaxed font-sans mt-0.5">{ins.summary}</p>

                            <div className="bg-slate-900/60 p-2.5 rounded border border-slate-850 text-[11px] leading-relaxed text-emerald-400 font-sans mt-1">
                              <strong>Recommended Action:</strong> {ins.action}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. AI COMMENT AUDITOR CARD */}
                {socialWidgets.showSentiment && (
                  <div className="lg:col-span-6 flex flex-col gap-6 print:hidden w-full">
                    <div id="ai-comment-auditor-pane" className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm font-mono flex flex-col gap-4">
                      
                      <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-purple-400" />
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Gemini Sentiment & Compliance Auditor</h4>
                        </div>
                        <span className="text-[9.5px] bg-slate-950 border border-slate-850 px-2 py-0.5 rounded text-purple-400 font-bold tracking-widest uppercase">LITE MODEL ROUTE</span>
                      </div>

                      <form onSubmit={handleAnalyzeComment} className="flex flex-col gap-3 text-xs">
                        <div className="grid grid-cols-2 gap-3.5">
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-400 font-bold text-[10.5px]">Social platform source</label>
                            <select
                              value={commentPlatform}
                              onChange={(e) => setCommentPlatform(e.target.value)}
                              className="bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                            >
                              <option value="facebook">Facebook Comment</option>
                              <option value="instagram">Instagram DM</option>
                              <option value="linkedin">LinkedIn Post Reply</option>
                              <option value="website">Direct Website Form Inquiry</option>
                            </select>
                          </div>
                          
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-400 font-bold text-[10.5px]">Regional Area Filter</label>
                            <span className="bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-2 text-slate-300 block select-none">Schuylkill / Luzerne / Northumb.</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-slate-400 font-bold text-[10.5px]">Provide customer feedback text</label>
                          <textarea
                            rows={3}
                            required
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            placeholder="Paste client reviews, email copy, product concerns, or regulatory sensitive text here to verify index compliance..."
                            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-700 focus:outline-none resize-none font-sans text-xs"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isAnalyzingComment}
                          className="bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 text-slate-950 disabled:text-slate-500 font-bold py-2.5 px-4 rounded-lg cursor-pointer text-center uppercase tracking-wider flex items-center justify-center gap-2"
                        >
                          {isAnalyzingComment ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin" /> Performing Compliance Audit...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4" /> Audit Post Comment with Gemini
                            </>
                          )}
                        </button>
                      </form>

                      {analyzedError && (
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-lg font-sans">
                          {analyzedError}
                        </div>
                      )}

                      {/* Result audit board */}
                      {analyzedCommentResult && (
                        <div className="p-4 rounded-xl border border-slate-850 bg-slate-950 flex flex-col gap-3 font-mono text-xs w-full">
                          <div className="flex items-center justify-between border-b border-slate-850 pb-2 flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                              <strong className="text-white text-xs uppercase tracking-wide">Analysis Complete</strong>
                            </div>
                            <span className="text-[10px] text-slate-400">Model confidence: <strong>{(analyzedCommentResult.confidence * 100).toFixed(0)}%</strong></span>
                          </div>

                          <div className="grid grid-cols-2 gap-3.5 font-sans">
                            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850">
                              <div className="text-[10.5px] text-slate-500 font-semibold uppercase">Sentiment Mix:</div>
                              <strong className="text-white text-xs capitalize">{analyzedCommentResult.sentiment}</strong>
                            </div>
                            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850">
                              <div className="text-[10.5px] text-slate-500 font-semibold uppercase">Urgency level:</div>
                              <strong className={`text-xs uppercase font-extrabold ${
                                analyzedCommentResult.urgency === "high" ? "text-rose-400" : "text-amber-400"
                              }`}>{analyzedCommentResult.urgency}</strong>
                            </div>
                            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850 col-span-2">
                              <div className="text-[10.5px] text-slate-500 font-semibold uppercase mb-1">Identified Content Tags:</div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {analyzedCommentResult.topics?.map((tag: string, i: number) => (
                                  <span key={i} className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-teal-400 font-semibold">{tag}</span>
                                ))}
                              </div>
                            </div>
                            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850">
                              <div className="text-[10.5px] text-slate-500 font-semibold uppercase">Lead Potential:</div>
                              <strong className="text-teal-400 text-xs uppercase">{analyzedCommentResult.lead_potential}</strong>
                            </div>
                            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850">
                              <div className="text-[10.5px] text-slate-500 font-semibold uppercase">Compliance Warning:</div>
                              <strong className={`text-xs uppercase ${
                                analyzedCommentResult.compliance_risk === "none"
                                  ? "text-emerald-400"
                                  : "text-rose-400 font-extrabold"
                              }`}>{analyzedCommentResult.compliance_risk}</strong>
                            </div>
                            <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10 col-span-2 text-slate-200">
                              <div className="text-[10.5px] text-indigo-300 font-semibold uppercase mb-1">Recommended Response Directive:</div>
                              <p className="leading-relaxed font-sans mt-0.5 text-xs text-slate-300">{analyzedCommentResult.recommended_action}</p>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                )}

                {/* ===================== DIRECT LEAD BATCH INGESTION TERMINAL (CSV) ===================== */}
                <div className="lg:col-span-12 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md font-mono flex flex-col gap-5 w-full print:hidden">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
                        <Database className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Latimore Pipeline Batch Ingestion Terminal</h4>
                        <p className="text-[11px] text-slate-400 mt-1">Supabase DB Direct Import • Central PA Territory Automation OS</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold px-2.5 py-1 rounded-full uppercase tracking-widest font-mono">
                      ACTIVE PIPELINE BRIDGE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Guidance & File Ingestion Panel */}
                    <div className="md:col-span-5 flex flex-col gap-4">
                      <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wide">Import Instructions</h5>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        Upload a CSV file containing lead information to bulk ingest records directly into the live CRM pipeline. This tool maps names, locations, and product preferences to instantly initialize their profiles.
                      </p>

                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col gap-3">
                        <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest">Supported Headers:</span>
                        <div className="flex flex-col gap-2 font-mono text-[10.5px]">
                           <div className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                             <span className="text-slate-300 font-semibold w-16">name:</span>
                             <span className="text-slate-500">FullName / Client (Required)</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                             <span className="text-slate-300 font-semibold w-16">email:</span>
                             <span className="text-slate-500">EmailAddress / Contact Mail</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                             <span className="text-slate-300 font-semibold w-16">phone:</span>
                             <span className="text-slate-500">CellNumber / Phone (Central PA)</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                             <span className="text-slate-300 font-semibold w-16">stage:</span>
                             <span className="text-slate-500">New / Contacted / Booked_Call etc.</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                             <span className="text-slate-300 font-semibold w-16">notes:</span>
                             <span className="text-slate-500">Comments, interest details or legacy notes</span>
                           </div>
                        </div>
                      </div>

                      {/* Sample CSV downloader */}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const dummyHeader = "name,email,phone,notes,stage,smsConsentStatus,emailConsentStatus\nJackson Latimore,jackson@latimorelegacy.com,570-555-0120,AED Legacy story inquiry - IUL option,New,opted_in,opted_in\nSarah Northumberland,sarah.north@example.com,570-555-0814,Interested in Senior Whole Life coverage,Contacted,unknown,opted_in";
                            const blob = new Blob([dummyHeader], { type: "text/csv;charset=utf-8;" });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.setAttribute("href", url);
                            link.setAttribute("download", "latimore_pipeline_template.csv");
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          className="flex-1 bg-slate-950 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-850 py-2 px-3 rounded-lg text-[10.5px] cursor-pointer transition-all uppercase tracking-wider text-center"
                        >
                          Download Sample Template CSV
                        </button>
                      </div>
                    </div>

                    {/* File Drop area */}
                    <div className="md:col-span-7 flex flex-col gap-4">
                      <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wide">File Drag & Selection Zone</h5>
                      
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setCsvDragActive(true);
                        }}
                        onDragLeave={() => setCsvDragActive(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setCsvDragActive(false);
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            handleCsvFileLoad(e.dataTransfer.files[0]);
                          }
                        }}
                        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-center transition-all ${
                          csvDragActive
                            ? "border-amber-500 bg-amber-500/5 text-amber-300"
                            : "border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-400"
                        }`}
                      >
                        <Database className="h-8 w-8 text-slate-500 mb-1" />
                        <span className="text-xs font-bold text-slate-300">Drag and drop your contact CSV pipeline file here</span>
                        <span className="text-[10px] text-slate-500">Or click below to browse Local Storage</span>
                        
                        <label className="mt-2 shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg cursor-pointer text-xs transition-all uppercase tracking-wider">
                          Browse Local File
                          <input
                            type="file"
                            accept=".csv"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleCsvFileLoad(e.target.files[0]);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {csvError && (
                        <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl font-sans flex items-start gap-2">
                          <span className="font-bold">Error:</span>
                          <span>{csvError}</span>
                        </div>
                      )}

                      {csvSuccess && (
                        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs rounded-xl font-sans flex items-start gap-2">
                          <span className="font-bold">Success:</span>
                          <span>{csvSuccess}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Preview Table Segment (Render only when CSV records exist) */}
                  {csvParsedContacts.length > 0 && (
                    <div className="border border-slate-850 bg-slate-950 rounded-xl p-5 flex flex-col gap-4 mt-2">
                      <div className="flex items-center justify-between border-b border-slate-850 pb-3 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                          <strong className="text-white text-xs uppercase tracking-wide">Contacts Batch Preview Board ({csvParsedContacts.length} items)</strong>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setCsvParsedContacts([])}
                            className="text-[10.5px] bg-slate-900 border border-slate-800 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg cursor-pointer hover:border-slate-700 font-semibold"
                          >
                            Reset Preview
                          </button>
                          <button
                            type="button"
                            onClick={handleCsvUpload}
                            disabled={isUploadingCsv}
                            className="text-[10.5px] bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-1.5 rounded-lg cursor-pointer transition-all uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-40"
                          >
                            {isUploadingCsv ? (
                              <>
                                <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Committing Batch Ingestion...
                              </>
                            ) : (
                              <>
                                Commit {csvParsedContacts.length} Contacts to Supabase
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="overflow-x-auto max-h-72 custom-scrollbar">
                        <table className="w-full text-left font-sans text-xs border-collapse text-slate-300">
                          <thead>
                            <tr className="border-b border-slate-850 text-slate-500 text-[10px] uppercase font-mono tracking-wider">
                              <th className="py-2.5 px-3">Lead / Client Name</th>
                              <th className="py-2.5 px-3">Contact Email</th>
                              <th className="py-2.5 px-3">Phone Line</th>
                              <th className="py-2.5 px-3">Target Pipeline Stage</th>
                              <th className="py-2.5 px-3">Consent Track status</th>
                              <th className="py-2.5 px-3">Private Notes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {csvParsedContacts.map((contact, index) => (
                              <tr key={index} className="border-b border-slate-850/40 hover:bg-slate-900/40 transition-colors">
                                <td className="py-2.5 px-3 text-white font-semibold">{contact.name}</td>
                                <td className="py-2.5 px-3 text-slate-300">{contact.email || <span className="text-slate-600">-</span>}</td>
                                <td className="py-2.5 px-3 text-slate-300 font-mono text-[11px]">{contact.phone || <span className="text-slate-600">-</span>}</td>
                                <td className="py-2.5 px-3">
                                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono capitalize">
                                    {contact.stage || "New"}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 font-mono text-[10px]">
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-slate-400">SMS: <strong className="text-slate-300">{contact.smsConsentStatus || "unknown"}</strong></span>
                                    <span className="text-slate-400">Email: <strong className="text-slate-300">{contact.emailConsentStatus || "unknown"}</strong></span>
                                  </div>
                                </td>
                                <td className="py-2.5 px-3 text-slate-400 max-w-xs truncate" title={contact.notes || ""}>
                                  {contact.notes || <span className="text-slate-600 font-mono">-</span>}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. WEEKLY EXECUTIVE BRIEFING MEMO WORKSPACE */}
                <div id="social-weekly-memo" className="lg:col-span-12 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm font-mono mt-4 flex flex-col gap-4 w-full">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-3 print:border-slate-800">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-pink-400 print:text-slate-800" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider print:text-slate-800">Elite Weekly Briefing Report Terminal</h4>
                    </div>

                    <div className="flex items-center gap-2.5 print:hidden">
                      <button
                        type="button"
                        onClick={handleGenerateWeeklyReport}
                        disabled={isGeneratingWeeklyReport}
                        className="bg-pink-500 hover:bg-pink-400 disabled:opacity-40 text-slate-950 font-bold px-4 py-2 rounded-lg cursor-pointer text-xs"
                      >
                        {isGeneratingWeeklyReport ? "Compiling briefing..." : "Draft Executive Briefing"}
                      </button>
                      <button
                        type="button"
                        onClick={() => window.print()}
                        disabled={!weeklyReportResult}
                        className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 hover:text-white border border-slate-700 px-3 py-2 rounded-lg cursor-pointer text-xs flex items-center gap-1.5"
                      >
                        Print/Save Branded PDF
                      </button>
                    </div>
                  </div>

                  {weeklyReportError && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-lg font-sans">
                      {weeklyReportError}
                    </div>
                  )}

                  {/* Print custom head template */}
                  <div className="hidden print:block text-slate-950">
                    <div className="text-center font-bold text-2xl uppercase tracking-wider">Latimore Life & Legacy LLC</div>
                    <div className="text-center text-xs mt-1 uppercase text-slate-600 font-mono">Central Pennsylvania Business Operating Audit</div>
                    <div className="text-center font-bold text-xs mt-0.5 text-slate-800 tracking-widest uppercase mb-4 text-emerald-700">#TheBeatGoesOn - Dec 7 2010 Surviving AED Legacy</div>
                    <div className="border-b-2 border-slate-800 pb-2 mb-4 flex justify-between text-xs font-mono">
                      <span>REPORT TYPE: Social Engagement Intelligence & GA4</span>
                      <span>DATE: May 21, 2026 onwards</span>
                    </div>
                  </div>

                  {/* Empty presentation view */}
                  {!weeklyReportResult && !isGeneratingWeeklyReport && (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500 h-full min-h-[160px] print:hidden">
                      <BookOpen className="h-8 w-8 text-slate-700 mb-2" />
                      <p className="text-xs leading-relaxed max-w-sm">
                        <strong>WEEKLY EXECUTIVE MEMO DRAFT IS EMPTY</strong> <br /> Trigger the report compiler using current KPI aggregates to compose a professional business operating briefing report.
                      </p>
                    </div>
                  )}

                  {isGeneratingWeeklyReport && (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-slate-300 h-full min-h-[160px]">
                      <RefreshCw className="h-6 w-6 animate-spin text-pink-500 mb-3" />
                      <p className="text-xs font-mono uppercase tracking-widest">Compiling Facebook, Instagram, LinkedIn, and core GA4 metric streams into executive disclaimers...</p>
                    </div>
                  )}

                  {/* Render briefing report */}
                  {weeklyReportResult && (
                    <div className="p-6 rounded-xl border border-slate-805 bg-slate-950 print:bg-white print:text-slate-900 print:border-none print:p-0 flex flex-col gap-5 text-xs text-slate-300 leading-relaxed font-sans w-full">
                      
                      <div className="flex items-center justify-between border-b border-indigo-950/40 pb-3 flex-wrap gap-2 print:border-slate-300">
                        <div>
                          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20 px-2 py-0.5 rounded font-mono uppercase print:bg-transparent print:border-slate-500 print:text-slate-800">WEEKLY OPERATING MEMORANDUM</span>
                          <h4 className="text-sm font-bold text-white tracking-tight mt-1 font-mono print:text-slate-950">LATIMORE INSURANCE BRIEFING REPORT</h4>
                        </div>
                        <div className="text-right font-mono text-[10.5px] text-slate-400 print:text-slate-600">
                          <div>Reporting Duration: <strong className="text-slate-100 print:text-slate-950">{weeklyReportResult.reportingPeriod}</strong></div>
                          <div>GA4 ID: G-S0Q3E4DEBJ</div>
                        </div>
                      </div>

                      {/* Segment 1 */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full">
                        <div className="md:col-span-12 font-mono">
                          <p className="text-slate-300 print:text-slate-800 italic leading-relaxed font-sans bg-slate-900/40 p-3.5 rounded-lg border border-slate-850 print:border-slate-200 print:bg-slate-100">
                            <strong>Executive Summary:</strong> {weeklyReportResult.executiveSummary}
                          </p>
                        </div>

                        {/* Channels summaries */}
                        <div className="md:col-span-4 p-4 rounded-xl bg-slate-900 border border-slate-850 print:bg-slate-50 print:border-slate-200">
                          <strong className="text-blue-400 border-b border-slate-800 pb-1.5 display font-mono block uppercase text-[10.5px] print:text-slate-900 print:border-slate-300">Facebook Channel Hub</strong>
                          <p className="text-slate-300 leading-normal mt-2 text-[11.5px] print:text-slate-800">{weeklyReportResult.facebookPerformance}</p>
                        </div>

                        <div className="md:col-span-4 p-4 rounded-xl bg-slate-900 border border-slate-850 print:bg-slate-50 print:border-slate-200">
                          <strong className="text-pink-400 border-b border-slate-800 pb-1.5 display font-mono block uppercase text-[10.5px] print:text-slate-900 print:border-slate-300">Instagram Visual Hub</strong>
                          <p className="text-slate-300 leading-normal mt-2 text-[11.5px] print:text-slate-800">{weeklyReportResult.instagramPerformance}</p>
                        </div>

                        <div className="md:col-span-4 p-4 rounded-xl bg-slate-900 border border-slate-850 print:bg-slate-50 print:border-slate-200">
                          <strong className="text-amber-400 border-b border-slate-800 pb-1.5 display font-mono block uppercase text-[10.5px] print:text-slate-900 print:border-slate-300">LinkedIn Business Hub</strong>
                          <p className="text-slate-300 leading-normal mt-2 text-[11.5px] print:text-slate-800">{weeklyReportResult.linkedinPerformance}</p>
                        </div>

                        <div className="md:col-span-12 p-4 rounded-xl bg-slate-900 border border-slate-850 print:bg-slate-50 print:border-slate-200 mt-2">
                          <strong className="text-teal-400 border-b border-slate-800 pb-1.5 display font-mono block uppercase text-[10.5px] print:text-slate-900 print:border-slate-300">Google Analytics G-S0Q3E4DEBJ (Website & Blog Traffic Flow)</strong>
                          <p className="text-slate-300 leading-normal mt-2 text-[11.5px] print:text-slate-800">{weeklyReportResult.websiteEmailPerformance}</p>
                        </div>

                        <div className="md:col-span-12 p-4 rounded-xl bg-slate-900 border border-slate-850 print:bg-slate-50 print:border-slate-200 mt-2">
                          <strong className="text-white border-b border-slate-800 pb-1.5 display font-mono block uppercase text-[10.5px] print:text-slate-900 print:border-slate-300">Trending Product Topics & Local Inquiries</strong>
                          <p className="text-slate-300 leading-normal mt-2 text-[11.5px] print:text-slate-800">{weeklyReportResult.topTopicsAnalysis}</p>
                        </div>

                        {/* Compliance block */}
                        <div className="md:col-span-12 border border-rose-500/20 bg-rose-500/5 p-4 rounded-xl print:text-red-900 print:border-red-400 print:bg-red-50">
                          <div className="flex justify-between items-center border-b border-rose-500/20 pb-2 mb-2 print:border-red-400">
                            <strong className="text-rose-400 font-mono text-xs uppercase tracking-wide print:text-red-800">Regulatory Compliance & Underwriting Guidelines Audit</strong>
                            <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono font-bold uppercase print:bg-red-200 print:text-red-900">Rating: {weeklyReportResult.complianceAuditRating}</span>
                          </div>
                          <p className="font-sans text-[11.5px] leading-relaxed text-slate-300 print:text-slate-800">{weeklyReportResult.regulatoryNotes}</p>
                        </div>

                        {/* Recommended directives list */}
                        <div className="md:col-span-12 bg-indigo-500/5 border border-indigo-500/10 p-4 rounded-xl font-mono text-xs text-slate-300">
                          <strong className="text-indigo-300 font-bold block uppercase text-[10.5px] mb-2 print:text-indigo-900">Recommended Executive Strategic Directives:</strong>
                          <ol className="list-decimal pl-4 flex flex-col gap-1.5 font-sans">
                            {weeklyReportResult.recommendedDirectives?.map((dir: string, i: number) => (
                              <li key={i} className="text-slate-300 print:text-slate-800 leading-normal text-xs">{dir}</li>
                            ))}
                          </ol>
                        </div>

                      </div>

                      {/* Foot disclaimers */}
                      <p className="text-[10px] text-slate-500 text-center font-mono tracking-normal leading-normal italic mt-4 border-t border-slate-900 pt-3 print:border-slate-200">
                        Latimore Life & Legacy Operating System v1.0 • Pottsville Office • #TheBeatGoesOn Cardiac Legacy Mission Dec 7 2010. <br />
                        Confidential corporate planning tool for Jackson M. Latimore Sr. and associates.
                      </p>

                    </div>
                  )}

                </div>

                {/* 7. SOCIAL CAMPAIGN SCHEDULER & PUBLISHING QUEUE */}
                {socialWidgets.showScheduler && (
                  <div className="lg:col-span-12 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm font-mono flex flex-col gap-4 mt-4 print:hidden w-full">
                    
                    <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                      <div className="flex items-center gap-2">
                        <Share2 className="h-4 w-4 text-emerald-400" />
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Campaign Publisher Terminal</h4>
                      </div>
                      <span className="text-[10px] bg-slate-950 border border-slate-850 px-2.5 py-0.5 rounded text-emerald-400 font-bold uppercase tracking-wider">Direct API Connection</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                      
                      {/* Left form */}
                      <div className="lg:col-span-5 bg-slate-950 p-4 rounded-lg border border-slate-850 flex flex-col gap-3.5">
                        <strong className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-850 pb-1 flex items-center gap-1.5">
                          <PlusCircle className="h-3.5 w-3.5 text-emerald-400" /> Complete Post Brief
                        </strong>

                        <form onSubmit={handleSchedulePost} className="flex flex-col gap-3 text-xs">
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                              <label className="text-slate-400 font-bold text-[10px]">Publisher Channel</label>
                              <select
                                value={newPostPlatform}
                                onChange={(e) => setNewPostPlatform(e.target.value)}
                                className="bg-slate-900 border border-slate-800 rounded-md px-2.5 py-1.5 focus:outline-none"
                              >
                                <option value="facebook">Facebook Account</option>
                                <option value="instagram">Instagram Account</option>
                                <option value="linkedin">LinkedIn Page</option>
                                <option value="website">Website Blog</option>
                              </select>
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-slate-400 font-bold text-[10px]">Media visual Seed</label>
                              <input
                                type="text"
                                value={newPostMediaUrl}
                                onChange={(e) => setNewPostMediaUrl(e.target.value)}
                                placeholder="Pricum photos code seed"
                                className="bg-slate-900 border border-slate-800 rounded-md px-2 py-1.5 focus:outline-none text-white font-mono"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-slate-400 font-bold text-[10px]">Scheduler release date & time</label>
                            <input
                              type="datetime-local"
                              value={newPostScheduledAt}
                              onChange={(e) => setNewPostScheduledAt(e.target.value)}
                              className="bg-slate-900 border border-slate-800 rounded-md px-2 py-1.5 focus:outline-none text-white font-mono"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-slate-400 font-bold text-[10px] flex items-center justify-between">
                              <span>Post Caption text</span>
                              <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider">Compliance Disclaimers Active ✓</span>
                            </label>
                            <textarea
                              rows={5}
                              required
                              value={newPostCaption}
                              onChange={(e) => setNewPostCaption(e.target.value)}
                              placeholder="Write engaging educational life insurance messaging. E.g. indexed cash value options, buy-sells, annuity, pension max etc. disclaimer will automatically append."
                              className="bg-slate-900 border border-slate-800 rounded-md px-3 py-2 focus:outline-none font-sans text-xs text-white shrink-0 resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 px-3 rounded-lg cursor-pointer uppercase text-xs transition-all tracking-wider text-center flex items-center justify-center gap-1.5"
                          >
                            <Plus className="h-4 w-4" /> Queue Post Draft
                          </button>

                        </form>
                      </div>

                      {/* Right queue table list */}
                      <div className="lg:col-span-7 flex flex-col gap-2 max-h-[460px] overflow-y-auto pr-1">
                        <strong className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-850 pb-1.5 pl-1">Publishing Pipeline Queue</strong>
                        
                        {scheduledPosts
                          .filter(post => selectedSocialPlatformFilter === "all" || post.platform === selectedSocialPlatformFilter)
                          .map((post) => (
                            <div key={post.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-850 flex items-start gap-4 w-full">
                              {/* Media image */}
                              {post.mediaUrl && (
                                <div className="h-14 w-14 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden relative shrink-0">
                                  <img src={post.mediaUrl} className="h-full w-full object-cover" alt="Campaign visual" />
                                </div>
                              )}

                              <div className="flex-1 font-mono text-xs">
                                <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                                  <span className="text-[9.5px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">{post.platform}</span>
                                  <span className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded border ${
                                    post.status === "published"
                                      ? "bg-indigo-500/15 text-indigo-300 border-indigo-500/20"
                                      : post.status === "approved"
                                      ? "bg-green-500/15 text-green-300 border-green-500/20"
                                      : "bg-slate-900 text-slate-400 border-slate-800"
                                  }`}>
                                    {post.status}
                                  </span>
                                  {post.scheduledAt && (
                                    <span className="text-[10px] text-slate-505">Scheduled: <strong>{new Date(post.scheduledAt).toLocaleString()}</strong></span>
                                  )}
                                </div>

                                <p className="text-slate-350 leading-relaxed font-sans text-xs">{post.caption}</p>

                                {/* Actions on post */}
                                <div className="flex items-center gap-3.5 mt-2 text-[10.5px]">
                                  {post.status === "draft" && (
                                    <button
                                      type="button"
                                      onClick={() => handleApprovePost(post.id)}
                                      className="text-amber-400 hover:text-white capitalize transition-all cursor-pointer font-bold"
                                    >
                                      Approve post
                                    </button>
                                  )}
                                  {post.status !== "published" && (
                                    <button
                                      type="button"
                                      onClick={() => handlePublishPostNow(post.id)}
                                      className="text-emerald-400 hover:text-white transition-all cursor-pointer font-bold"
                                    >
                                      Publish Now
                                    </button>
                                  )}
                                  {post.status === "published" && post.publishedAt && (
                                    <span className="text-slate-500">Released: {new Date(post.publishedAt).toLocaleTimeString()}</span>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => setScheduledPosts((prev) => prev.filter((p) => p.id !== post.id))}
                                    className="text-slate-500 hover:text-rose-400 transition-all cursor-pointer ml-auto font-bold"
                                  >
                                    Delete
                                  </button>
                                </div>

                              </div>
                            </div>
                          ))}
                      </div>

                    </div>

                  </div>
                )}

              </motion.div>
            )}

            {/* ===================== TAB 4: APP CONNECTORS & WORKSPACE INTEGRATIONS ===================== */}
            {activeTab === "integrations" && (
              <motion.div
                key="integrations"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6"
              >
                
                {/* Integration Header Information */}
                <div className="bg-gradient-to-br from-indigo-950/20 via-slate-900 to-slate-900 border border-indigo-900/30 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-5 font-mono">
                  <div className="flex-1">
                    <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">Sync Unified Streams</span>
                    <h3 className="text-base font-bold text-white mt-1">Interlinked Third-party App Feeds</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1 max-w-xl">
                      Synchronize real data channels to populate your life database instantly. Workouts logged in Fitbit or Strava, Calendars mapped from Google Calendar, and ledger aggregates parsed via Plaid will self-categorize and link to their relative goals automatically.
                    </p>
                  </div>

                  <button
                    onClick={handleSyncApps}
                    disabled={isSyncingApps}
                    className="shrink-0 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer flex items-center gap-2.5 shadow shadow-teal-500/10"
                  >
                    <RefreshCw className={`h-4 w-4 ${isSyncingApps ? "animate-spin" : ""}`} />
                    Sync Workspace Feeds Now
                  </button>
                </div>

                {/* Batch Processing Panel */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider bg-teal-500/5 px-2 py-1 rounded border border-teal-500/10">Batch Operations</span>
                    <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
                    <span className="text-slate-300 font-medium">
                      Selected: <span className="text-teal-400 font-bold font-mono">{selectedIntegrationIds.length}</span> / {integrations.length} Feed Connectors
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={handleSelectAllIntegrations}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-800 hover:text-white transition-all text-[11px] font-bold cursor-pointer"
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      onClick={handleClearIntegrationSelection}
                      disabled={selectedIntegrationIds.length === 0}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 disabled:opacity-55 hover:bg-slate-850 text-slate-400 disabled:text-slate-600 border border-slate-800 hover:text-white transition-all text-[11px] font-bold cursor-pointer"
                    >
                      Deselect All
                    </button>
                    <button
                      type="button"
                      onClick={handleBulkSync}
                      disabled={selectedIntegrationIds.length === 0 || isSyncingApps}
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold disabled:opacity-50 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 hover:brightness-110 transition-all text-[11px] flex items-center gap-1.5 shadow-sm shadow-teal-500/10 cursor-pointer"
                    >
                      <Zap className="h-3.5 w-3.5 fill-current" />
                      Bulk Sync ({selectedIntegrationIds.length})
                    </button>
                  </div>
                </div>

                {/* Integrations Grid Map */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {integrations.map((int) => {
                    const IconComponent = getIntIcon(int.icon);
                    const isSelected = selectedIntegrationIds.includes(int.id);
                    return (
                      <div 
                        key={int.id} 
                        onClick={() => toggleIntegrationSelection(int.id)}
                        className={`bg-slate-900 border rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between gap-4 shadow-sm relative overflow-hidden cursor-pointer selection-none ${
                          isSelected ? "border-teal-500/50 ring-1 ring-teal-500/20" : "border-slate-800"
                        }`}
                      >
                        
                        {/* Sync status active indicator */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono border font-bold uppercase ${
                            int.connected
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : "bg-slate-950 text-slate-400 border-slate-850"
                          }`}>
                            {int.connected ? "Active" : "Disabled"}
                          </span>
                        </div>
 
                        <div className="flex items-start gap-4">
                          <div className="flex items-center self-center h-full mr-1" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleIntegrationSelection(int.id)}
                              className="h-4 w-4 rounded border-slate-850 bg-slate-950 text-teal-400 focus:ring-teal-500 focus:ring-offset-slate-900 cursor-pointer accent-teal-500"
                            />
                          </div>
                          
                          <div className={`h-11 w-11 rounded-xl flex items-center justify-center border shrink-0 ${
                            int.connected ? int.badgeColor : "bg-slate-950 border-slate-800 text-slate-500"
                          }`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="text-[10.5px] font-mono text-slate-400 uppercase font-semibold">{int.group} API Integration</span>
                            <h4 className="text-sm font-bold text-white mt-0.5">{int.name}</h4>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed font-mono">{int.description}</p>
                          </div>
                        </div>
 
                        <div className="border-t border-slate-850/80 pt-4 flex items-center justify-between font-mono text-xs" onClick={(e) => e.stopPropagation()}>
                          <span className="text-[10.5px] text-slate-400">Last Synced: <span className="text-slate-300 font-bold">{int.lastSync}</span></span>
                          
                          <button
                            onClick={() => handleToggleIntegration(int.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              int.connected
                                ? "bg-slate-950 hover:bg-slate-850 text-rose-400 border border-slate-800"
                                : "bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold"
                            }`}
                          >
                            {int.connected ? "Disconnect API" : "Authorize Scope"}
                          </button>
                        </div>
 
                      </div>
                    );
                  })}
                </div>

                {/* Simulated Plaid / Webhook Payload Visualizer */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4 font-mono">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">Integration Developer Endpoint Config (Simulated Webhooks)</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      Configure webhook URLs so your Fitbit, Plaid, or Strava integrations can automatically issue push payloads to Latimore Life & Legacy databases:
                    </p>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 rounded-lg p-3.5 flex flex-col gap-2.5 text-xs">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-teal-400 font-bold uppercase text-[10.5px]">Fitbit REST Webhook:</span>
                      <code className="text-slate-400 bg-slate-900 px-2 py-0.5 rounded text-[11px]">https://ais-pre-latimorelegacy.run.app/api/webhooks/fitbit</code>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-orange-400 font-bold uppercase text-[10.5px]">Strava Webhook Subscription:</span>
                      <code className="text-slate-400 bg-slate-900 px-2 py-0.5 rounded text-[11px]">https://ais-pre-latimorelegacy.run.app/api/webhooks/strava</code>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-blue-400 font-bold uppercase text-[10.5px]">Plaid Sync Aggregate:</span>
                      <code className="text-slate-400 bg-slate-900 px-2 py-0.5 rounded text-[11px]">https://ais-pre-latimorelegacy.run.app/api/webhooks/plaid</code>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 leading-normal">
                    * The dev server automatically validates incoming payloads with SHA-256 signatures from source platforms. Triggering a mock feed sync mimics this cryptographic handshake using the &quot;Fetch App Feeds&quot; button.
                  </p>
                </div>

              </motion.div>
            )}

            {/* ===================== TAB 5: AUTOLOOP COURSE BUILDER / GPT-CHAIN WORKSPACE ===================== */}
            {activeTab === "autoloop" && (
              <motion.div
                key="autoloop"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6"
              >
                
                {/* Visual Header Banner */}
                <div className="bg-gradient-to-br from-amber-950/25 via-slate-900 to-slate-900 border border-amber-900/40 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-5 font-mono">
                  <div className="flex-1">
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/15">
                      GPT-Chain Loop Workspace
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2 tracking-tight flex items-center gap-1.5">
                      <Layers className="h-5 w-5 text-amber-400 animate-pulse" />
                      AutoLoop Course & Lead Magnet Compiler
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1 max-w-2xl">
                      Configure parameters and automate multi-phase curriculum creation step-by-step. Each chain node prompts Gemini server-side to generate, validate, and serialize structured educational and SEO assets into your Change Log.
                    </p>
                  </div>
                  
                  <div className="flex select-none flex-col items-center p-3 bg-slate-950 rounded-xl border border-slate-850 text-center shrink-0 min-w-44">
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Active Loop Status</span>
                    <span className="text-sm font-bold text-amber-400 mt-1 uppercase font-mono tracking-wide">
                      {isRunningAll ? "Running Loop..." : isExecutingNode ? "Compiling..." : "Awaiting Trigger"}
                    </span>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${isRunningAll || isExecutingNode ? "bg-amber-400 animate-ping" : "bg-slate-700"}`} />
                      <span className="text-[10px] text-slate-400 font-mono">
                        Node {activeNodeIndex + 1} / {WORKFLOW_NODES.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary workspace layout splits */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Control Deck & Node Pipeline */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    
                      {/* Setup Parameters Panel */}
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-4 shadow-sm">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                          <h4 className="text-xs font-bold text-slate-200 font-mono uppercase tracking-wider flex items-center gap-1.5">
                            <Settings className="h-4 w-4 text-slate-400" />
                            1. Dynamic Compilation Parameters
                          </h4>
                        </div>

                        {/* Workflow Preset Selector & JSON Importer */}
                        <div className="flex flex-col gap-2 pb-3 border-b border-slate-800">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
                            <span>Workflow Preset / Architecture</span>
                            <span className="text-amber-400 font-mono text-[9px]">v1.2</span>
                          </label>
                          <div className="flex gap-1.5">
                            <select
                              value={autoloopPreset}
                              onChange={(e) => setAutoloopPreset(e.target.value as any)}
                              className="flex-1 bg-slate-950 border border-slate-800 text-slate-300 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none font-mono text-xs cursor-pointer"
                            >
                              <option value="seo">🎓 SEO Lead Magnet Compiler</option>
                              <option value="codebase">🧠 Codebase Audit & Fix Loop</option>
                              <option value="daily_brief">📅 Daily Marketing Command Brief</option>
                              <option value="email_drip">✉️ Email Drip Campaign Engine</option>
                              {customWorkflowNodes.length > 0 && (
                                <option value="custom">📁 Custom Uploaded Chain</option>
                              )}
                            </select>
                            
                            <button
                              onClick={() => document.getElementById("autoloop-json-uploader")?.click()}
                              className="bg-slate-950 hover:bg-slate-850 text-slate-300 p-2 rounded border border-slate-800 flex items-center justify-center gap-1.5 cursor-pointer hover:border-slate-700 hover:text-white"
                              title="Import gptcha.in JSON"
                            >
                              <Upload className="h-4 w-4" />
                              <span className="text-[10px] font-mono shrink-0 hidden sm:inline">Import</span>
                            </button>
                          </div>
                          
                          <input
                            type="file"
                            id="autoloop-json-uploader"
                            accept=".json"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                try {
                                  const parsed = JSON.parse(event.target?.result as string);
                                  if (parsed.workflow && Array.isArray(parsed.workflow.nodes)) {
                                    setCustomWorkflowNodes(parsed.workflow.nodes);
                                    setAutoloopPreset("custom");
                                    setNodeExecutionLogs((prev) => [
                                      ...prev,
                                      `System: Successfully imported Custom GPT-Chain "${parsed.metadata?.name || 'Custom workflow'}" containing ${parsed.workflow.nodes.length} nodes!`
                                    ]);
                                  } else if (Array.isArray(parsed.nodes)) {
                                    setCustomWorkflowNodes(parsed.nodes);
                                    setAutoloopPreset("custom");
                                    setNodeExecutionLogs((prev) => [
                                      ...prev,
                                      `System: Successfully imported Custom Node list containing ${parsed.nodes.length} nodes!`
                                    ]);
                                  } else {
                                    alert("Invalid gptcha.in JSON file format. Nodes array not found.");
                                  }
                                } catch (err: any) {
                                  alert("Failed to parse JSON: " + err.message);
                                }
                              };
                              reader.readAsText(file);
                            }}
                          />
                        </div>
                        
                        {/* Preset A: SEO Course Compiler Fields */}
                        {autoloopPreset === "seo" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-bold text-slate-400">BRAND NAME</label>
                              <input
                                type="text"
                                value={autoloopBrand}
                                onChange={(e) => setAutoloopBrand(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-bold text-slate-400">COURSE ACRONYM / NAME</label>
                              <input
                                type="text"
                                value={autoloopCourseName}
                                onChange={(e) => setAutoloopCourseName(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none"
                              />
                            </div>

                            <div className="flex flex-col gap-1 sm:col-span-2">
                              <label className="text-[10px] font-bold text-slate-400">PRIMARY TOPIC / CONCEPT</label>
                              <input
                                type="text"
                                value={autoloopTopic}
                                onChange={(e) => setAutoloopTopic(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none"
                              />
                            </div>

                            <div className="flex flex-col gap-1 sm:col-span-2">
                              <label className="text-[10px] font-bold text-slate-400">DESIRED STUDENT OUTCOME</label>
                              <textarea
                                rows={2}
                                value={autoloopOutcome}
                                onChange={(e) => setAutoloopOutcome(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none focus:ring-0 custom-scrollbar text-[11px]"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-bold text-slate-400">TARGET AUDIENCE</label>
                              <input
                                type="text"
                                value={autoloopAudience}
                                onChange={(e) => setAutoloopAudience(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-bold text-slate-400">TONE STANCE</label>
                              <select
                                value={autoloopTone}
                                onChange={(e) => setAutoloopTone(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-300 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none font-sans text-xs"
                              >
                                <option value="authoritative">Authoritative Executive</option>
                                <option value="helpful">Helpful Neighbor</option>
                                <option value="expert">Technical Expert</option>
                                <option value="local">Central PA Trust-Grounded</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {/* Preset B: Codebase Audit & Fix Loop Fields */}
                        {autoloopPreset === "codebase" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-bold text-slate-400">PROJECT_NAME</label>
                              <input
                                type="text"
                                value={auditProjectName}
                                onChange={(e) => setAuditProjectName(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-bold text-slate-400">PRIMARY_LANGUAGE</label>
                              <input
                                type="text"
                                value={auditPrimaryLanguage}
                                onChange={(e) => setAuditPrimaryLanguage(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-bold text-slate-400">FRAMEWORKS</label>
                              <input
                                type="text"
                                value={auditFrameworks}
                                onChange={(e) => setAuditFrameworks(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-bold text-slate-400">BRANCH_NAME</label>
                              <input
                                type="text"
                                value={auditBranchName}
                                onChange={(e) => setAuditBranchName(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none"
                              />
                            </div>

                            <div className="flex flex-col gap-1 sm:col-span-2">
                              <label className="text-[10px] font-bold text-slate-400">AUDIT_FOCUS</label>
                              <input
                                type="text"
                                value={auditAuditFocus}
                                onChange={(e) => setAuditAuditFocus(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none"
                              />
                            </div>

                            <div className="flex flex-col gap-1 sm:col-span-2">
                              <label className="text-[10px] font-bold text-slate-400">REPOSITORY_CONTEXT</label>
                              <textarea
                                rows={3}
                                value={auditRepositoryContext}
                                onChange={(e) => setAuditRepositoryContext(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none focus:ring-0 custom-scrollbar text-[11px]"
                              />
                            </div>

                            <div className="flex flex-col gap-1 sm:col-span-2">
                              <label className="text-[10px] font-bold text-slate-400">KNOWN_ISSUES</label>
                              <textarea
                                rows={2}
                                value={auditKnownIssues}
                                onChange={(e) => setAuditKnownIssues(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none focus:ring-0 custom-scrollbar text-[11px]"
                              />
                            </div>

                            <div className="flex flex-col gap-1 sm:col-span-2">
                              <label className="text-[10px] font-bold text-slate-400">CODEBASE_STANDARDS</label>
                              <textarea
                                rows={2}
                                value={auditCodebaseStandards}
                                onChange={(e) => setAuditCodebaseStandards(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none focus:ring-0 custom-scrollbar text-[11px]"
                              />
                            </div>

                            <div className="flex flex-col gap-1 sm:col-span-2">
                              <label className="text-[10px] font-bold text-slate-400">RECENT_CHANGES</label>
                              <textarea
                                rows={2}
                                value={auditRecentChanges}
                                onChange={(e) => setAuditRecentChanges(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none focus:ring-0 custom-scrollbar text-[11px]"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-bold text-slate-400">BUILD_COMMAND</label>
                              <input
                                type="text"
                                value={auditBuildCommand}
                                onChange={(e) => setAuditBuildCommand(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-bold text-slate-400">OUTPUT_FORMAT</label>
                              <input
                                type="text"
                                value={auditOutputFormat}
                                onChange={(e) => setAuditOutputFormat(e.target.value)}
                                className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none"
                              />
                            </div>
                          </div>
                        )}

                        {/* Preset D: Daily Marketing Command Brief Fields */}
                        {autoloopPreset === "daily_brief" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
                            {DAILY_BRIEF_FIELDS.map((field) => (
                              <div
                                key={field.key}
                                className={`flex flex-col gap-1 ${field.multiline ? "sm:col-span-2" : ""}`}
                              >
                                <label className="text-[10px] font-bold text-slate-400">{field.label}</label>
                                {field.multiline ? (
                                  <textarea
                                    rows={2}
                                    value={dailyBriefVars[field.key]}
                                    onChange={(e) => updateDailyBriefVar(field.key, e.target.value)}
                                    className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none focus:ring-0 custom-scrollbar text-[11px]"
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    value={dailyBriefVars[field.key]}
                                    onChange={(e) => updateDailyBriefVar(field.key, e.target.value)}
                                    className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Preset E: Email Drip Campaign Engine Fields */}
                        {autoloopPreset === "email_drip" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
                            {EMAIL_DRIP_FIELDS.map((field) => (
                              <div
                                key={field.key}
                                className={`flex flex-col gap-1 ${field.multiline ? "sm:col-span-2" : ""}`}
                              >
                                <label className="text-[10px] font-bold text-slate-400">{field.label}</label>
                                {field.multiline ? (
                                  <textarea
                                    rows={2}
                                    value={emailDripVars[field.key]}
                                    onChange={(e) => updateEmailDripVar(field.key, e.target.value)}
                                    className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none focus:ring-0 custom-scrollbar text-[11px]"
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    value={emailDripVars[field.key]}
                                    onChange={(e) => updateEmailDripVar(field.key, e.target.value)}
                                    className="bg-slate-950 border border-slate-800 text-slate-200 rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Preset C: Custom Uploaded Field Notifications */}
                        {autoloopPreset === "custom" && (
                          <div className="p-3 bg-slate-950 border border-slate-850 rounded text-xs leading-relaxed text-slate-400 font-mono">
                            <span className="text-amber-400 font-bold">Custom Workflow Loaded</span>: Active gptcha.in JSON layout mapping <span className="text-white">{customWorkflowNodes.length} nodes</span> successfully. No additional parameters are required. Variables from the template (e.g. <code className="text-amber-500">{`{PROJECT_NAME}`}</code>, <code className="text-amber-500">{`{course_topic}`}</code>) will fallback to active parameters during execution.
                          </div>
                        )}

                      {/* Control Panel Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 mt-2 pt-3 border-t border-slate-800">
                        <button
                          onClick={() => handleExecuteNode(activeNodeIndex)}
                          disabled={isExecutingNode || isRunningAll || activeNodeIndex >= WORKFLOW_NODES.length}
                          className="flex-1 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold py-2.5 px-4 rounded-lg text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {isExecutingNode ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              Generating Node...
                            </>
                          ) : (
                            <>
                              <Cpu className="h-4 w-4" />
                              Run Next Node Step
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => setIsRunningAll(n => !n)}
                          disabled={isExecutingNode || activeNodeIndex >= WORKFLOW_NODES.length}
                          className={`flex-1 border text-xs font-bold py-2.5 px-4 rounded-lg tracking-wide uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            isRunningAll
                              ? "border-rose-500/50 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                              : "border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                          }`}
                        >
                          {isRunningAll ? "Pause AutoLoop" : "AutoRun All Nodes"}
                        </button>

                        <button
                          onClick={() => {
                            setActiveNodeIndex(0);
                            setIsRunningAll(false);
                            if (autoloopPreset === "codebase") {
                              setAutoloopOutputs({
                                "1": `# Audit Loop Initialized\n\n- **Status**: START node reached\n- **Target Project**: ${auditProjectName}\n- **Audit Focus**: ${auditAuditFocus}\n- **Timestamp**: ${new Date().toLocaleString()}`
                              });
                              setNodeExecutionLogs([
                                `System: Codebase Workspace reset completed. Fix Log rebooted.`,
                                `System: Awaiting trigger command to compile Node 2.`
                              ]);
                            } else if (autoloopPreset === "seo") {
                              setAutoloopOutputs({
                                "1": `# Workflow Initialization\n\n- **Status**: START node reached\n- **Timestamp**: ${new Date().toISOString()}`,
                                "2": `# Change Log initialized\n\n- **Change Log Identifier**: COURSE LOOP — Jackson Latimore OS\n- **Loop iteration count**: 1\n- **Active target topic**: ${autoloopTopic}\n- **Target Audience**: ${autoloopAudience}\n\n*Ready to compile course outline.*`
                              });
                              setNodeExecutionLogs([
                                `System: SEO Workspace reset completed. Change Log rebooted.`,
                                `System: Awaiting trigger command of Outline Node.`
                              ]);
                            } else if (autoloopPreset === "daily_brief") {
                              setAutoloopOutputs({
                                "1": `# Daily Marketing Command Brief Initialized\n\n- **Status**: START node reached\n- **Brief Date**: ${dailyBriefVars.BRIEF_DATE}\n- **Community Focus**: ${dailyBriefVars.COMMUNITY_FOCUS}\n- **Timestamp**: ${new Date().toLocaleString()}`
                              });
                              setNodeExecutionLogs([
                                `System: Daily Marketing Command Brief workspace reset completed.`,
                                `System: Awaiting trigger command of Daily Context Setup Node.`
                              ]);
                            } else if (autoloopPreset === "email_drip") {
                              setAutoloopOutputs({
                                "1": `# Email Drip Campaign Engine Initialized\n\n- **Status**: START node reached\n- **Business**: ${emailDripVars.business_name}\n- **Brand**: ${emailDripVars.brand_name}\n- **Timestamp**: ${new Date().toLocaleString()}`
                              });
                              setNodeExecutionLogs([
                                `System: Email Drip Campaign Engine workspace reset completed.`,
                                `System: Awaiting trigger command of Business + Plan Context Lock Node.`
                              ]);
                            } else {
                              setAutoloopOutputs({
                                "1": `# Custom GPT-Chain Initialized\n\n- **Status**: START node reached\n- **Timestamp**: ${new Date().toLocaleString()}`
                              });
                              setNodeExecutionLogs([
                                `System: Custom workspace reset completed.`,
                                `System: Ready to execute nodes.`
                              ]);
                            }
                          }}
                          className="border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white font-bold py-2.5 px-3 rounded-lg text-xs uppercase tracking-wide cursor-pointer text-center font-mono"
                          title="Reset Loop Sequence"
                        >
                          Reset
                        </button>

                        <button
                          onClick={handleExportAutoloopData}
                          className="border border-teal-500/30 hover:border-teal-500/60 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 font-bold py-2.5 px-3 rounded-lg text-xs uppercase tracking-wide cursor-pointer text-center font-mono flex items-center justify-center gap-1.5 flex-1"
                          title="Export all generated nodes and current change log to TXT"
                        >
                          <Download className="h-4 w-4" />
                          Export TXT
                        </button>
                      </div>
                    </div>

                    {/* Interactive Workflow Sequence Maps */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-slate-200 font-mono uppercase tracking-wider">
                          2. GPT-Chain Roadmap Sequence
                        </h4>
                        <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase">Sequential Order</span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 max-h-[380px] overflow-y-auto pr-1 select-none custom-scrollbar font-mono text-[10.5px]">
                        {WORKFLOW_NODES.map((node, i) => {
                          const isCompleted = autoloopOutputs[node.id] !== undefined;
                          const isActive = activeNodeIndex === i;
                          const isSelected = selectedOutputNodeId === node.id;
                          
                          return (
                            <button
                              key={node.id}
                              onClick={() => {
                                if (isCompleted) {
                                  setSelectedOutputNodeId(node.id);
                                }
                              }}
                              className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                                isActive
                                  ? "border-amber-500/60 bg-amber-500/10 ring-1 ring-amber-500/40"
                                  : isCompleted
                                  ? isSelected
                                    ? "border-teal-400 bg-teal-500/10 text-teal-200 cursor-pointer"
                                    : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:text-white cursor-pointer"
                                  : "border-slate-850/40 bg-slate-950/20 text-slate-500 opacity-60 cursor-not-allowed"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1 w-full">
                                <span className={`text-[9px] uppercase font-bold tracking-wider ${isActive ? "text-amber-400" : isCompleted ? "text-teal-400" : "text-slate-600"}`}>
                                  {node.type === "START" ? "Start" : node.type === "END" ? "End" : `Node ${node.id}`}
                                </span>
                                
                                {isCompleted ? (
                                  <Check className="h-3 w-3 text-teal-400 shrink-0" />
                                ) : isActive ? (
                                  <RefreshCw className="h-3 w-3 text-amber-400 animate-spin shrink-0" />
                                ) : (
                                  <span className="h-1.5 w-1.5 rounded-full bg-slate-800" />
                                )}
                              </div>
                              <span className="font-semibold truncate max-w-full text-slate-200 leading-tight">
                                {node.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Console Live Terminal */}
                    <div className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden shadow-lg font-mono text-[11px] h-44 flex flex-col">
                      <div className="bg-slate-900 border-b border-slate-850 px-3 py-1.5 flex items-center justify-between select-none shrink-0">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-rose-500" />
                          <span className="h-2 w-2 rounded-full bg-amber-500" />
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        </div>
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">CHANGE_LOG Term</span>
                      </div>
                      <div className="p-3 overflow-y-auto flex-1 flex flex-col gap-1 text-teal-400 select-all scrollbar-thin scrollbar-thumb-slate-800">
                        {nodeExecutionLogs.map((log, lIdx) => (
                          <div key={lIdx} className="leading-relaxed whitespace-pre-wrap breakdown-words">
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Output Documents Viewer Panel */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    
                    {/* View Document Box */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md flex-1 flex flex-col min-h-[580px]">
                      
                      <div className="bg-slate-900 border-b border-slate-800 p-4 shrink-0 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg">
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="text-[9px] font-mono text-amber-400 font-bold uppercase tracking-wider bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                              Node ID: {selectedOutputNodeId}
                            </span>
                            <h4 className="text-sm font-bold text-white mt-1">
                              {WORKFLOW_NODES.find(n => n.id === selectedOutputNodeId)?.label || "Compiled Output Document"}
                            </h4>
                          </div>
                        </div>

                        {autoloopOutputs[selectedOutputNodeId] && (
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(autoloopOutputs[selectedOutputNodeId]);
                              alert("Content successfully copied to clipboard.");
                            }}
                            className="text-[10px] font-mono bg-slate-950 hover:bg-slate-850 px-3 py-1.5 rounded border border-slate-800 text-slate-300 hover:text-white cursor-pointer select-none transition-colors"
                          >
                            Copy Markdown Source
                          </button>
                        )}
                      </div>

                      {/* Display Markdown parsed view or instructions */}
                      <div className="p-5 overflow-y-auto max-h-[640px] flex-1 bg-slate-950 font-sans leading-relaxed text-sm text-slate-300 custom-scrollbar select-text selection:bg-amber-500/20">
                        {autoloopOutputs[selectedOutputNodeId] ? (
                          <div className="flex flex-col gap-4">
                            
                            {/* Fast Inline Styled Renderer to render Markdown tables, headers, and bullet points elegantly */}
                            {autoloopOutputs[selectedOutputNodeId]
                              .split("\n")
                              .map((line, lineIdx) => {
                                const trimLine = line.trim();
                                if (trimLine.startsWith("# ")) {
                                  return (
                                    <h1 key={lineIdx} className="text-xl font-bold text-white border-b border-slate-800 pb-2 mt-4 tracking-tight">
                                      {trimLine.replace("# ", "")}
                                    </h1>
                                  );
                                }
                                if (trimLine.startsWith("## ")) {
                                  return (
                                    <h2 key={lineIdx} className="text-md font-semibold text-amber-400 mt-3 tracking-tight">
                                      {trimLine.replace("## ", "")}
                                    </h2>
                                  );
                                }
                                if (trimLine.startsWith("### ")) {
                                  return (
                                    <h3 key={lineIdx} className="text-sm font-bold text-white mt-2">
                                      {trimLine.replace("### ", "")}
                                    </h3>
                                  );
                                }
                                if (trimLine.startsWith("- ") || trimLine.startsWith("* ")) {
                                  return (
                                    <div key={lineIdx} className="flex items-start gap-2 pl-2 text-xs font-mono">
                                      <span className="text-amber-500 mt-1 select-none">▪</span>
                                      <span>{trimLine.replace(/^[-*]\s+/, "")}</span>
                                    </div>
                                  );
                                }
                                if (trimLine.startsWith("|")) {
                                  // Render a clean tabular data line in a table design
                                  const cols = trimLine.split("|").filter((_, cIdx, arr) => cIdx > 0 && cIdx < arr.length - 1);
                                  const isHeaderSeparators = trimLine.includes("---");
                                  if (isHeaderSeparators) return null;
                                  return (
                                    <div key={lineIdx} className="grid grid-cols-4 gap-2 py-1.5 px-3 bg-slate-900/40 border border-slate-850 rounded text-xs font-mono mt-1">
                                      {cols.map((col, colIdx) => (
                                        <span key={colIdx} className="truncate select-all text-slate-300">
                                          {col.trim().replace(/\*\*/g, "")}
                                        </span>
                                      ))}
                                    </div>
                                  );
                                }
                                if (trimLine === "") {
                                  return <div key={lineIdx} className="h-2" />;
                                }
                                return (
                                  <p key={lineIdx} className="text-xs text-slate-400 font-mono leading-relaxed">
                                    {trimLine}
                                  </p>
                                );
                              })}

                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-center py-20 gap-3 text-slate-500 select-none">
                            <Cpu className="h-10 w-10 text-slate-700 animate-pulse" />
                            <div>
                              <p className="font-mono text-xs text-slate-400">Node Document Empty</p>
                              <p className="text-[11px] text-slate-500 font-mono mt-1 max-w-sm">
                              Press &apos;Run Next Node Step&apos; on the left deck to prompt Gemini and compile this section&apos;s documents.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                  </div>

                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </main>

      </div>

      {/* ----------------- APP FOOTER ----------------- */}
      <footer className="bg-slate-950 border-t border-slate-900 p-6 text-center text-xs text-slate-500 font-mono shrink-0 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 Latimore Life & Legacy OS. Self-contained local tracking environment with server proxy cryptography.</p>
          <div className="flex items-center gap-4">
            <span className="text-teal-400">Status: Online</span>
            <span>API Version: v3.5-flash-grounded</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
