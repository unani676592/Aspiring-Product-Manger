import {
  MagnifierIcon,
  RobotIcon,
  BoxIcon,
  TargetIcon,
  TrashIcon,
  FolderIcon,
  TeardownFolderIcon,
} from "@/components/PixelArt";

/**
 * REGISTRY: every openable item, keyed by id.
 *  - icon / label: how it appears as an icon (desktop or inside a folder)
 *  - windowPos: where its window opens on screen
 *  - content: what the window renders (project / trash / folder)
 */
export const REGISTRY = {
  wavelength: {
    label: "WaveLength Teardown",
    icon: MagnifierIcon,
    windowPos: { x: 180, y: 110 },
    content: {
      type: "project",
      problem:
        "Identified what WaveLength's app wasn't solving well for its target user.",
      approach:
        "Defined product vision (PRDs, wireframes), analyzed user needs (research, competitive analysis), and tracked KPIs (engagement, feature adoption).",
      decision:
        "Proposed improvements and shared the teardown directly with WaveLength's founders.",
      status: "Completed",
    },
  },

  "ai-assistant": {
    label: "AI Assistant",
    icon: RobotIcon,
    windowPos: { x: 300, y: 150 },
    content: {
      type: "project",
      subtitle: "Telegram",
      problem:
        "Managing email, calendar, and quick research meant constantly switching between separate apps, which broke focus and wasted time. The goal was to run all of it from one place, with a hard constraint: build it entirely on free tools, no paid APIs.",
      approach:
        "Built the assistant in n8n using an orchestrator agent that delegates to specialised sub-agents for email, calendar, and research. Added a full voice-and-text pipeline so input can be typed or spoken, and a memory store so it recalls earlier context instead of starting fresh each time.",
      decision:
        "Chose a modular multi-agent design over one large workflow, so each part could be built, tested, and fixed on its own. When the first memory provider kept failing, I rebuilt that layer on a different free provider rather than forcing a broken tool to work.",
      impact: [
        {
          lead: "Functional Outcome",
          text: "Built and validated a cross-platform prototype that consolidates email, calendar, and research tasks into a single conversational interface, eliminating context-switching friction by replacing multi-app navigation with one natural language input.",
        },
        {
          lead: "Product Trade-offs",
          text: "Built a modular multi-agent system, splitting tasks among specialised sub-agents, to maintain output quality and prevent model drift within free-tier resource constraints. Added a persistent memory store so responses use verified historical context rather than generative assumptions.",
        },
        {
          lead: "PM Takeaway",
          text: 'Shifted the user from an "operator" (manually executing tasks across three apps) to a "director" (supervising aggregated AI outputs). Kept deployment safe with a strict human-in-the-loop review before any critical external action.',
        },
      ],
      status: "Completed",
    },
  },

  "order-routing": {
    label: "Order Routing",
    icon: BoxIcon,
    windowPos: { x: 360, y: 120 },
    content: {
      type: "project",
      problem:
        "A D2C brand's orders all landed in one messy Google Sheet with several statuses mixed together. Nothing routed automatically, so the right team, ops, support, or finance, often found out late, and the data itself was inconsistent and hard to read.",
      approach:
        "Built a self-hosted n8n automation with Docker, Google Sheets, Slack, and Gmail. It reads live orders, sorts them by status into clean separate tabs, and notifies the correct team automatically, ops and support by Slack, finance by email.",
      decision:
        "Kept the raw order data and the sorted output in two separate files, so a wrong routing rule can never overwrite or damage the original data. Chose automation over asking staff to keep checking a sheet, since the routing logic was fixed and repeatable, a clean fit for a rules-based system.",
      impact: [
        {
          lead: "Functional Outcome",
          text: "Built a reliable operational pipeline that automates order triage, categorisation, and cross-functional team notifications, removing manual data entry and communication overhead between operations, support, and finance.",
        },
        {
          lead: "Product Trade-offs",
          text: "Prioritised data integrity by enforcing a strict separation between raw ingestion data and sorted output tabs, so unexpected routing errors or messy inputs never corrupt or overwrite foundational business data.",
        },
        {
          lead: "PM Takeaway",
          text: "Replaced high-friction manual sorting with a deterministic, switch-based routing framework driven entirely by order status, ensuring zero guesswork in the chain and a consistent, repeatable path from sheet to Slack and email.",
        },
      ],
      status: "Completed",
    },
  },

  "gtm-research": {
    label: "GTM Research",
    icon: TargetIcon,
    windowPos: { x: 420, y: 180 },
    content: {
      type: "project",
      problem:
        "Finding businesses that genuinely need automation was slow and repetitive, hunting for leads, checking if each was a real fit, and logging them one by one, with no consistent system behind it.",
      approach:
        "Treated lead generation like product discovery. Mapped each business's real pain points to a matching automation solution and qualified them by problem type, using only public, verifiable sources, no data brokers and no guessed emails.",
      decision:
        "Built reusable, problem-type-based solutions instead of a custom build for every lead, so the work scales instead of restarting each time. Deliberately prioritised a smaller, trustworthy list over a large unverified one.",
      impact: [
        {
          lead: "Functional Outcome",
          text: "Systematised the go-to-market lead generation process, removing the repetitive administrative burden of manual business discovery, fit evaluation, and individual lead logging.",
        },
        {
          lead: "Product Trade-offs",
          text: "Made a deliberate trade-off to prioritise pipeline quality over lead volume. Restricted ingestion strictly to public, verifiable sources while blocking unconfirmed leads and third-party data brokers, keeping the target database trustworthy.",
        },
        {
          lead: "PM Takeaway",
          text: "Replaced subjective, gut-feel lead validation with a rigid, problem-type qualification framework. Grouping outputs by problem type keeps the pipeline structured, repeatable, and aligned with core business criteria instead of an unorganised list.",
        },
      ],
      status: "Completed",
    },
  },

  "product-teardowns": {
    label: "Product Teardowns",
    icon: TeardownFolderIcon,
    windowPos: { x: 160, y: 110 },
    content: {
      type: "folder",
      childIds: ["wavelength"],
    },
  },

  "ai-automations": {
    label: "AI Automations",
    icon: FolderIcon,
    windowPos: { x: 220, y: 130 },
    content: {
      type: "folder",
      childIds: ["ai-assistant", "order-routing", "gtm-research"],
    },
  },

  trash: {
    label: "Rejected Concepts",
    icon: TrashIcon,
    windowPos: { x: 240, y: 210 },
    content: {
      type: "trash",
      intro: "Ideas that didn't make the cut (for good reason):",
      items: [
        "A portfolio that was just my resume as a single, unscrollable JPEG.",
        '"ProductManager.exe" — a Clippy clone that only says "have you considered the user?"',
        "A dark-mode-only site with the contrast turned all the way down for ~vibes~.",
        "Gamified contact form: beat my high score to unlock my email.",
        "An AI that writes the case studies so I don't have to. (Ironic, I know.)",
      ],
    },
  },
};

/** What sits loose on the desktop (position + optional sublabel). */
export const DESKTOP_ICONS = [
  {
    id: "product-teardowns",
    iconPos: { x: 60, y: 90 },
    sublabel: "1 project inside",
  },
  {
    id: "ai-automations",
    iconPos: { x: 180, y: 90 },
    sublabel: "3 projects inside",
  },
  { id: "trash", iconPos: { x: 80, y: 230 } },
];
