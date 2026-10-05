import type { Project } from '../types/site';

export const uiforgingProject: Project = {
  id: 'uiforging',
  name: 'UIForging',
  status: 'In progress',
  tagline:
    'A visual development workspace for designing, structuring and exporting interfaces with a developer-focused workflow.',
  tags: ['TypeScript', 'React', 'Spring Boot', 'Visual Editor', 'SaaS'],
  cover: '',
  links: [],
  category: 'products',
  updatedAt: 'October 2026',
  wiki: [
    {
      id: 'overview',
      title: 'Overview',
      blocks: [
        {
          type: 'text',
          value:
            '<strong>UIForging</strong> is a visual development workspace designed to bridge interface design and software development. It combines visual composition, structured project data, reusable UI elements and a developer-oriented workflow in one product.',
        },
        {
          type: 'heading',
          value: 'Purpose',
        },
        {
          type: 'text',
          value:
            'Traditional design tools are optimized for visual work while development environments are optimized for code. UIForging aims to reduce the gap between the two by keeping interface structure explicit and machine-readable from the moment it is created.',
        },
        {
          type: 'heading',
          value: 'Core idea',
        },
        {
          type: 'list',
          items: [
            'Build interfaces visually on a canvas.',
            'Keep projects, pages and elements represented as structured data.',
            'Reuse components instead of duplicating interface structure.',
            'Organize projects in a workspace designed to feel closer to an IDE than a generic design dashboard.',
            'Export or transform the visual document into developer-friendly output.',
          ],
        },
        {
          type: 'note',
          title: 'Project status',
          value:
            'UIForging is under active development. Some sections in this documentation describe the intended architecture and product contract rather than a feature that is already production-ready.',
        },
      ],
    },
    {
      id: 'product-vision',
      title: 'Product vision & scope',
      blocks: [
        {
          type: 'heading',
          value: 'Problem statement',
        },
        {
          type: 'text',
          value:
            'Moving from design to implementation commonly requires manually recreating layouts, translating design decisions into code and maintaining separate sources of truth. UIForging treats the visual document itself as structured project data.',
        },
        {
          type: 'heading',
          value: 'Target users',
        },
        {
          type: 'list',
          items: [
            'Frontend developers who want a visual workflow without losing structural control.',
            'Designers who need output that maps more naturally to implementation.',
            'Solo developers and small teams building websites, applications and interface-heavy products.',
            'Users who want reusable components and project organization inside the same workspace.',
          ],
        },
        {
          type: 'heading',
          value: 'Main product areas',
        },
        {
          type: 'list',
          items: [
            'Authentication and user accounts.',
            'Project dashboard and project lifecycle management.',
            'Visual editor with pages, elements, selection and transforms.',
            'Reusable components and structured document data.',
            'Export pipeline.',
            'Account settings and subscriptions.',
          ],
        },
      ],
    },
    {
      id: 'user-manual',
      title: 'User manual',
      blocks: [
        {
          type: 'heading',
          value: '1. Create or access an account',
        },
        {
          type: 'text',
          value:
            'Users can access UIForging through a normal email/password account or supported OAuth providers. The intended providers are Google and GitHub.',
        },
        {
          type: 'heading',
          value: '2. Projects',
        },
        {
          type: 'list',
          items: [
            'Create a project from the projects workspace.',
            'Open an existing project to continue editing.',
            'Rename, organize or remove projects according to the available project actions.',
            'Project creation can be limited by the active subscription plan.',
          ],
        },
        {
          type: 'heading',
          value: '3. Editor',
        },
        {
          type: 'list',
          items: [
            '<strong>Select:</strong> select an element and expose its editable properties.',
            '<strong>Move:</strong> reposition selected elements on the canvas.',
            '<strong>Resize:</strong> change width and height using transform handles.',
            '<strong>Rotate:</strong> change element rotation.',
            '<strong>Text:</strong> create and edit text elements.',
            '<strong>Shape:</strong> create supported primitive visual elements.',
            '<strong>Frame:</strong> create container-like elements used to organize interface structure.',
            '<strong>Pages:</strong> separate a project into multiple documents/screens.',
            '<strong>Layers:</strong> inspect hierarchy and reorder elements.',
            '<strong>Zoom:</strong> navigate large documents without changing element dimensions.',
          ],
        },
        {
          type: 'heading',
          value: '4. Saving',
        },
        {
          type: 'text',
          value:
            'The editor document is serialized into structured project data and persisted through the backend. Users should receive a clear saved/saving/error state rather than assuming a local UI change has already reached the server.',
        },
        {
          type: 'heading',
          value: '5. Subscription',
        },
        {
          type: 'text',
          value:
            'The product supports Free, Premium and Pro plan states. Plan restrictions can include the maximum number of projects, maximum pages per project and access to selected features.',
        },
      ],
    },
    {
      id: 'functional-requirements',
      title: 'Functional requirements',
      blocks: [
        {
          type: 'list',
          items: [
            '<strong>FR-001 — Account creation:</strong> a user must be able to create an account using supported authentication methods.',
            '<strong>FR-002 — Authentication:</strong> a valid user must be able to establish an authenticated session.',
            '<strong>FR-003 — Project creation:</strong> an authenticated user may create projects while respecting server-side plan limits.',
            '<strong>FR-004 — Project ownership:</strong> users may only access or modify resources they are authorized to access.',
            '<strong>FR-005 — Pages:</strong> a project may contain multiple pages subject to plan rules.',
            '<strong>FR-006 — Elements:</strong> users can create, select, modify, reorder and remove supported editor elements.',
            '<strong>FR-007 — Persistence:</strong> project state can be serialized, saved and restored.',
            '<strong>FR-008 — Subscription:</strong> plan state controls applicable limits and protected features.',
            '<strong>FR-009 — Payments:</strong> payment-provider events can update subscription state after server-side verification.',
            '<strong>FR-010 — Export:</strong> supported project data can be transformed into an export format defined by the product.',
          ],
        },
        {
          type: 'heading',
          value: 'Non-functional requirements',
        },
        {
          type: 'list',
          items: [
            'Server-side authorization must not rely on client-provided trust signals.',
            'User input must be validated at trust boundaries.',
            'Editor interactions should remain responsive for realistic project sizes.',
            'Project data should be versionable so document schema changes can be migrated safely.',
            'Authentication, payment and subscription actions should be auditable through appropriate logs.',
          ],
        },
      ],
    },
    {
      id: 'architecture',
      title: 'System architecture',
      blocks: [
        {
          type: 'text',
          value:
            'The current project direction uses a <strong>React + TypeScript frontend</strong>, a <strong>Java + Spring Boot backend</strong>, a Supabase-hosted database layer, external OAuth providers and external payment gateways.',
        },
        {
          type: 'code',
          lang: 'text',
          value:
            'User\n  │\n  ▼\nReact + TypeScript frontend\n  │ HTTPS / API\n  ▼\nJava + Spring Boot backend\n  ├── Database / Supabase\n  ├── Google OAuth\n  ├── GitHub OAuth\n  ├── PayPal\n  └── Mercado Pago',
        },
        {
          type: 'heading',
          value: 'Responsibilities',
        },
        {
          type: 'list',
          items: [
            '<strong>Frontend:</strong> UI rendering, editor interaction, local interaction state and API requests.',
            '<strong>Backend:</strong> authentication, authorization, validation, persistence rules, plan enforcement and payment integration.',
            '<strong>Database:</strong> persistent user, project, subscription and session state.',
            '<strong>Payment providers:</strong> checkout/payment processing and signed/verified event delivery.',
          ],
        },
      ],
    },
    {
      id: 'editor-architecture',
      title: 'Editor architecture',
      blocks: [
        {
          type: 'code',
          lang: 'text',
          value:
            'Editor\n├── UI shell\n├── Tool system\n│   ├── Select\n│   ├── Frame\n│   ├── Text\n│   └── Shape\n├── Interaction engine\n│   ├── Selection\n│   ├── Drag\n│   ├── Resize\n│   ├── Rotation\n│   └── Zoom\n├── Document model\n│   ├── Project\n│   ├── Page\n│   └── Element\n├── History\n│   ├── Undo\n│   └── Redo\n├── Persistence\n│   ├── Serialization\n│   ├── Save\n│   └── Auto-save\n└── Export pipeline',
        },
        {
          type: 'heading',
          value: 'Design principle',
        },
        {
          type: 'text',
          value:
            'The visual editor should not make React components themselves the canonical document. The canonical document should be serializable editor data; the React tree is a rendering and interaction layer over that model.',
        },
      ],
    },
    {
      id: 'data-model',
      title: 'Editor data model',
      blocks: [
        {
          type: 'text',
          value:
            'The editor is organized around Project → Page → Element. Concrete element types extend a shared base representation.',
        },
        {
          type: 'code',
          lang: 'ts',
          value:
            'interface Project {\n  project_id: string;\n  project_name: string;\n  project_image?: string;\n  pages: Page[];\n}\n\ninterface Page {\n  page_id: string;\n  page_name: string;\n  elements: Element[];\n}\n\ninterface Element {\n  id: string;\n  name: string;\n  x: number;\n  y: number;\n  rotation: number;\n}',
        },
        {
          type: 'heading',
          value: 'Document versioning',
        },
        {
          type: 'text',
          value:
            'Persisted editor documents should include a schema version. Migrations can then convert older document versions instead of forcing every release to remain permanently compatible with every historical shape.',
        },
        {
          type: 'code',
          lang: 'json',
          value:
            '{\n  "version": 1,\n  "project": {\n    "id": "project-id",\n    "name": "Project",\n    "pages": []\n  }\n}',
        },
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend technical guide',
      blocks: [
        {
          type: 'list',
          items: [
            '<strong>Language:</strong> TypeScript.',
            '<strong>UI:</strong> React.',
            '<strong>Build tooling:</strong> Vite in the current frontend direction.',
            '<strong>Routing:</strong> application routes include public pages, authentication, project workspace, settings, subscriptions and project editor routes.',
            '<strong>API boundary:</strong> backend communication should be centralized instead of scattering raw fetch logic throughout view components.',
          ],
        },
        {
          type: 'heading',
          value: 'Suggested frontend layers',
        },
        {
          type: 'code',
          lang: 'text',
          value:
            'src/\n├── pages/\n├── components/\n├── editor/\n│   ├── tools/\n│   ├── model/\n│   ├── interactions/\n│   ├── history/\n│   └── serialization/\n├── api/\n├── auth/\n├── hooks/\n├── types/\n└── styles/',
        },
        {
          type: 'note',
          title: 'Rule',
          value:
            'Keep editor domain logic independent from presentational components whenever practical. That makes selection, transforms, serialization and history easier to test.',
        },
      ],
    },
    {
      id: 'backend',
      title: 'Backend technical guide',
      blocks: [
        {
          type: 'text',
          value:
            'The backend uses Java + Spring Boot and is responsible for security-sensitive decisions. The frontend may improve UX by hiding unavailable actions, but it is never the authority for ownership, plan limits or payment state.',
        },
        {
          type: 'code',
          lang: 'text',
          value:
            'Controller\n   ↓\nService\n   ↓\nRepository\n   ↓\nDatabase',
        },
        {
          type: 'heading',
          value: 'Primary domains',
        },
        {
          type: 'list',
          items: [
            'Authentication and accounts.',
            'Sessions.',
            'Projects and project data.',
            'Subscription state and entitlement checks.',
            'Payment-provider integration and webhooks.',
            'Validation and centralized error handling.',
          ],
        },
      ],
    },
    {
      id: 'api',
      title: 'API conventions',
      blocks: [
        {
          type: 'text',
          value:
            'The exact endpoint surface evolves with implementation, but the API should keep stable conventions for authentication, resource ownership, validation and error responses.',
        },
        {
          type: 'heading',
          value: 'Example resource contract',
        },
        {
          type: 'code',
          lang: 'http',
          value:
            'POST /api/projects\nContent-Type: application/json\n\n{\n  "name": "Landing Page"\n}',
        },
        {
          type: 'heading',
          value: 'Recommended error format',
        },
        {
          type: 'code',
          lang: 'json',
          value:
            '{\n  "error": {\n    "code": "PROJECT_LIMIT_REACHED",\n    "message": "Your current plan does not allow more projects.",\n    "requestId": "..."\n  }\n}',
        },
        {
          type: 'heading',
          value: 'Error-code families',
        },
        {
          type: 'list',
          items: [
            'AUTH_INVALID_CREDENTIALS / AUTH_SESSION_EXPIRED',
            'PROJECT_NOT_FOUND / PROJECT_ACCESS_DENIED / PROJECT_LIMIT_REACHED',
            'SUBSCRIPTION_REQUIRED / SUBSCRIPTION_EXPIRED',
            'PAYMENT_VERIFICATION_FAILED',
            'VALIDATION_ERROR',
          ],
        },
      ],
    },
    {
      id: 'database',
      title: 'Database',
      blocks: [
        {
          type: 'text',
          value:
            'The current backend specification defines persistent tables for <strong>users</strong>, <strong>projects</strong>, <strong>subscriptions</strong> and <strong>sessions</strong>. The exact SQL dialect and migrations should remain authoritative in the backend repository.',
        },
        {
          type: 'list',
          items: [
            '<strong>users:</strong> account identity, email, password hash and creation metadata.',
            '<strong>projects:</strong> ownership relation plus serialized project data.',
            '<strong>subscriptions:</strong> one subscription state per user, including plan and lifecycle status.',
            '<strong>sessions:</strong> hashed session token plus device/security metadata and expiration/revocation state.',
          ],
        },
        {
          type: 'heading',
          value: 'Project persistence',
        },
        {
          type: 'code',
          lang: 'text',
          value:
            'Editor state\n    ↓\nSerializer\n    ↓\nVersioned project JSON\n    ↓\nBackend validation\n    ↓\nprojects.project_data',
        },
      ],
    },
    {
      id: 'authentication',
      title: 'Authentication & sessions',
      blocks: [
        {
          type: 'heading',
          value: 'Supported authentication direction',
        },
        {
          type: 'list',
          items: ['Email + password', 'Google OAuth', 'GitHub OAuth'],
        },
        {
          type: 'heading',
          value: 'Session lifecycle',
        },
        {
          type: 'code',
          lang: 'text',
          value:
            'Credentials / OAuth callback\n        ↓\nIdentity validation\n        ↓\nSession creation\n        ↓\nToken delivered to client\n        ↓\nAuthenticated requests\n        ↓\nExpiration or revocation',
        },
        {
          type: 'list',
          items: [
            'Store session-token hashes rather than raw session tokens when the chosen session model permits it.',
            'Track expiration and revocation explicitly.',
            'Authorization must be re-evaluated on protected backend actions.',
            'Logout invalidates the corresponding server-side session where applicable.',
          ],
        },
      ],
    },
    {
      id: 'subscriptions',
      title: 'Plans & subscriptions',
      blocks: [
        {
          type: 'text',
          value:
            'The defined plan names are <strong>Free</strong>, <strong>Premium</strong> and <strong>Pro</strong>. The subscription model also defines active, expired and cancelled lifecycle states.',
        },
        {
          type: 'heading',
          value: 'Entitlement rules',
        },
        {
          type: 'list',
          items: [
            'Maximum number of projects may depend on plan.',
            'Maximum number of pages per project may depend on plan.',
            'Selected advanced features may be disabled on Free.',
            'Every protected entitlement must be validated server-side.',
          ],
        },
        {
          type: 'note',
          title: 'Important',
          value:
            'The frontend can display plan limits, disable buttons and show upgrade prompts, but the backend remains the source of truth for whether an operation is allowed.',
        },
      ],
    },
    {
      id: 'payments',
      title: 'Payments & webhooks',
      blocks: [
        {
          type: 'text',
          value:
            'The planned payment gateways are <strong>PayPal</strong> and <strong>Mercado Pago</strong>, with backend webhook handling used to synchronize subscription state.',
        },
        {
          type: 'code',
          lang: 'text',
          value:
            'User\n ↓\nCheckout provider\n ↓\nPayment\n ↓\nProvider webhook\n ↓\nUIForging backend\n ↓\nVerify event authenticity\n ↓\nUpdate subscription state',
        },
        {
          type: 'note',
          title: 'Trust boundary',
          value:
            'A browser redirect to a success page is not proof of payment. Subscription activation must be based on validated server-side provider state/events.',
        },
      ],
    },
    {
      id: 'security',
      title: 'Security model',
      blocks: [
        {
          type: 'heading',
          value: 'Security principles',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Never trust the client.',
            'Authentication does not automatically imply authorization.',
            'Validate ownership for every user-scoped resource operation.',
            'Validate plan restrictions on the backend.',
            'Validate and normalize external input at trust boundaries.',
            'Never expose backend secrets to the frontend bundle.',
            'Verify payment webhooks using the provider-approved verification mechanism.',
            'Apply appropriate protections against brute force, injection, XSS, CSRF/session abuse and excessive request volume.',
          ],
        },
        {
          type: 'heading',
          value: 'Threat examples',
        },
        {
          type: 'list',
          items: [
            '<strong>Modified project ID:</strong> backend ownership/authorization check.',
            '<strong>Fake plan value from browser:</strong> resolve entitlement from trusted backend state.',
            '<strong>Forged payment callback:</strong> verify provider event authenticity before state mutation.',
            '<strong>Stolen/replayed session:</strong> expiration, revocation and appropriate cookie/token protections.',
            '<strong>Malicious project payload:</strong> schema validation, size limits and output escaping/sanitization where required.',
          ],
        },
      ],
    },
    {
      id: 'implementation-details',
      title: 'Implementation details',
      blocks: [
        {
          type: 'heading',
          value: 'Selection and transforms',
        },
        {
          type: 'text',
          value:
            'Selection should operate on stable element identifiers. Move, resize and rotation operations update the document model through explicit editor commands/actions rather than mutating arbitrary React component state.',
        },
        {
          type: 'heading',
          value: 'History',
        },
        {
          type: 'text',
          value:
            'Undo/redo should record meaningful editor operations or document snapshots/diffs with a defined coalescing strategy for continuous actions such as dragging.',
        },
        {
          type: 'heading',
          value: 'Auto-save',
        },
        {
          type: 'text',
          value:
            'Auto-save should debounce high-frequency edits, expose save status, handle stale/failed requests and avoid silently overwriting newer server state if concurrent editing is introduced later.',
        },
        {
          type: 'heading',
          value: 'Export',
        },
        {
          type: 'text',
          value:
            'Export should be treated as a deterministic transformation from a versioned document model to a target output format. Export logic should not depend on hidden browser-only state.',
        },
      ],
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure & deployment',
      blocks: [
        {
          type: 'text',
          value:
            'The current deployment direction uses a separately deployed frontend and Spring Boot backend. Existing project work has used Vercel for frontend hosting and Render for backend hosting, with the database hosted through Supabase.',
        },
        {
          type: 'heading',
          value: 'Environment separation',
        },
        {
          type: 'list',
          items: [
            'Local development environment.',
            'Production environment.',
            'Optional staging/preview environment as deployment maturity grows.',
          ],
        },
        {
          type: 'heading',
          value: 'Configuration',
        },
        {
          type: 'list',
          items: [
            'Database connection values belong in environment configuration, not source code.',
            'OAuth client secrets must remain server-side.',
            'Payment/webhook secrets must remain server-side.',
            'Frontend environment variables should be treated as public unless the platform explicitly guarantees otherwise.',
          ],
        },
      ],
    },
    {
      id: 'development',
      title: 'Development guide',
      blocks: [
        {
          type: 'heading',
          value: 'Recommended workflow',
        },
        {
          type: 'code',
          lang: 'text',
          value:
            'Issue / task\n   ↓\nFeature branch\n   ↓\nImplementation\n   ↓\nTests + build\n   ↓\nReview\n   ↓\nMerge\n   ↓\nDeploy / verify',
        },
        {
          type: 'list',
          items: [
            'Prefer small, focused commits.',
            'Keep schema changes accompanied by migrations and documentation changes.',
            'Update this documentation when product behavior or architecture changes materially.',
            'Avoid coupling editor-domain logic to a single page/component when the logic belongs in reusable editor modules.',
          ],
        },
      ],
    },
    {
      id: 'testing',
      title: 'Testing strategy',
      blocks: [
        {
          type: 'list',
          items: [
            '<strong>Unit:</strong> serializers, transforms, validators, entitlement rules and isolated services.',
            '<strong>Integration:</strong> repositories, service/database behavior, authentication flows and webhook processing.',
            '<strong>API:</strong> authorization, validation, expected status codes and error contracts.',
            '<strong>E2E:</strong> sign in → create project → edit → save → reopen, plus subscription-sensitive flows.',
            '<strong>Editor regression:</strong> selection, drag, resize, rotation, hierarchy, zoom and serialization round trips.',
            '<strong>Security:</strong> ownership bypass attempts, invalid payloads, replay/forged provider events and session invalidation.',
          ],
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      blocks: [
        {
          type: 'heading',
          value: 'Project does not save',
        },
        {
          type: 'list',
          items: [
            'Check whether the authenticated session is still valid.',
            'Check the API response and centralized error code.',
            'Validate the serialized document against the expected schema/version.',
            'Confirm the user still has authorization to modify the project.',
          ],
        },
        {
          type: 'heading',
          value: 'Login/OAuth failure',
        },
        {
          type: 'list',
          items: [
            'Confirm frontend and backend callback URLs match the configured provider application.',
            'Verify environment-specific OAuth settings.',
            'Inspect backend logs without exposing secrets or tokens.',
          ],
        },
        {
          type: 'heading',
          value: 'Subscription not updated',
        },
        {
          type: 'list',
          items: [
            'Inspect the provider event/webhook delivery status.',
            'Confirm webhook authenticity verification succeeded.',
            'Check idempotency/event-processing records if implemented.',
            'Confirm the subscription row/state transition was accepted by business rules.',
          ],
        },
      ],
    },
    {
      id: 'reference',
      title: 'Reference & glossary',
      blocks: [
        {
          type: 'list',
          items: [
            '<strong>Project:</strong> top-level editable workspace document owned by a user.',
            '<strong>Page:</strong> a screen/document inside a project.',
            '<strong>Element:</strong> an editable object inside a page.',
            '<strong>Frame:</strong> a container-like element that can organize child elements.',
            '<strong>Component:</strong> reusable UI definition or instance.',
            '<strong>Document model:</strong> canonical serializable representation of editor state.',
            '<strong>Entitlement:</strong> permission/capability derived from the user plan and subscription state.',
            '<strong>Webhook:</strong> server-to-server event sent by an external provider.',
            '<strong>ADR:</strong> Architecture Decision Record documenting a meaningful technical decision and its trade-offs.',
          ],
        },
      ],
    },
    {
      id: 'roadmap',
      title: 'Roadmap & documentation policy',
      blocks: [
        {
          type: 'heading',
          value: 'Documentation ownership',
        },
        {
          type: 'text',
          value:
            'This Starless Studios page is the canonical human-readable UIForging documentation. Implementation-specific details should remain synchronized with the relevant source repositories.',
        },
        {
          type: 'heading',
          value: 'Keep updated when changing',
        },
        {
          type: 'list',
          items: [
            'Product naming or positioning.',
            'Editor document schema.',
            'Authentication/session model.',
            'Subscription plans or entitlement rules.',
            'Payment providers or webhook behavior.',
            'API contracts and error codes.',
            'Deployment architecture.',
            'Security-sensitive flows.',
          ],
        },
      ],
    },
  ],
};
