import {
  Zap,
  Boxes,
  GitBranch,
  Share2,
  Database,
  Clock,
  Link2,
  Layers,
  HelpCircle,
} from 'lucide-react'

export const topics = [
  {
    id: 'event-driven',
    href: '/event-driven',
    title: 'Event-Driven vs Request/Response',
    shortTitle: 'Event-Driven',
    description: 'Compare synchronous request-response patterns with asynchronous event-driven architectures. Learn when to use each approach.',
    icon: Zap,
    color: '#f59e0b',
  },
  {
    id: 'microservices',
    href: '/microservices',
    title: 'Microservices vs Monolithic',
    shortTitle: 'Microservices',
    description: 'Understand the trade-offs between monolithic applications and distributed microservices architecture.',
    icon: Boxes,
    color: '#3b82f6',
  },
  {
    id: 'choreography',
    href: '/choreography',
    title: 'Choreography vs Orchestration',
    shortTitle: 'Choreography',
    description: 'Explore two approaches to coordinating distributed workflows: centralized orchestration vs decentralized choreography.',
    icon: GitBranch,
    color: '#8b5cf6',
  },
  {
    id: 'fanout',
    href: '/fanout',
    title: 'Fanout Patterns',
    shortTitle: 'Fanout',
    description: 'Learn how to broadcast messages to multiple consumers efficiently using fanout patterns.',
    icon: Share2,
    color: '#ec4899',
  },
  {
    id: 'stateful',
    href: '/stateful',
    title: 'Stateful vs Stateless',
    shortTitle: 'Stateful',
    description: 'Compare stateful and stateless architectures. Understand session management and horizontal scaling.',
    icon: Database,
    color: '#22c55e',
  },
  {
    id: 'sync-async',
    href: '/sync-async',
    title: 'Sync vs Async',
    shortTitle: 'Sync/Async',
    description: 'Master synchronous and asynchronous programming patterns. Learn about blocking vs non-blocking operations.',
    icon: Clock,
    color: '#06b6d4',
  },
  {
    id: 'coupling',
    href: '/coupling',
    title: 'Loose vs Tight Coupling',
    shortTitle: 'Coupling',
    description: 'Understand dependency management and how coupling affects maintainability and flexibility.',
    icon: Link2,
    color: '#f43f5e',
  },
  {
    id: 'hybrid-patterns',
    href: '/hybrid-patterns',
    title: 'Hybrid Architecture Patterns',
    shortTitle: 'Hybrid',
    description: 'Real-world examples of combining architectural patterns: monolith with events, microservices with orchestration, and more.',
    icon: Layers,
    color: '#14b8a6',
  },
  {
    id: 'decision-guide',
    href: '/decision-guide',
    title: 'Architecture Decision Guide',
    shortTitle: 'Decisions',
    description: 'Choose the right patterns based on latency needs, failure tolerance, team maturity, domain stability, and operational capabilities.',
    icon: HelpCircle,
    color: '#a855f7',
  },
]

export const codeExamples = {
  eventDriven: {
    requestResponse: `// Request/Response Pattern
async function getUser(userId: string) {
  const response = await fetch(\`/api/users/\${userId}\`);
  const user = await response.json();
  return user;
}

// Caller waits for response
const user = await getUser('123');
console.log(user.name);`,
    eventDriven: `// Event-Driven Pattern
import { EventEmitter } from 'events';

const eventBus = new EventEmitter();

// Publisher
function createOrder(order: Order) {
  saveOrder(order);
  eventBus.emit('order.created', order);
}

// Subscribers
eventBus.on('order.created', (order) => {
  sendConfirmationEmail(order);
});

eventBus.on('order.created', (order) => {
  updateInventory(order);
});`,
  },
  microservices: {
    monolithic: `// Monolithic Architecture
class OrderController {
  async createOrder(req: Request) {
    // All logic in one codebase
    const user = await this.userService.validate(req.userId);
    const inventory = await this.inventoryService.check(req.items);
    const payment = await this.paymentService.process(req.payment);
    const order = await this.orderService.create(req);
    await this.notificationService.send(user, order);
    return order;
  }
}`,
    microservices: `// Microservices Architecture
// Order Service
async function createOrder(req: Request) {
  const order = await saveOrder(req);
  await messageQueue.publish('order.created', order);
  return order;
}

// Separate services react to events
// inventory-service/handler.ts
queue.subscribe('order.created', updateInventory);

// notification-service/handler.ts
queue.subscribe('order.created', sendNotification);`,
  },
  choreography: {
    orchestration: `// Orchestration Pattern
class OrderOrchestrator {
  async processOrder(order: Order) {
    // Central coordinator controls the flow
    await this.paymentService.charge(order);
    await this.inventoryService.reserve(order);
    await this.shippingService.schedule(order);
    await this.notificationService.notify(order);
  }

  async handleFailure(step: string, order: Order) {
    // Orchestrator handles compensation
    await this.compensate(step, order);
  }
}`,
    choreography: `// Choreography Pattern
// Each service reacts to events independently

// Payment Service
eventBus.on('order.created', async (order) => {
  await processPayment(order);
  eventBus.emit('payment.completed', order);
});

// Inventory Service
eventBus.on('payment.completed', async (order) => {
  await reserveItems(order);
  eventBus.emit('inventory.reserved', order);
});

// Shipping Service
eventBus.on('inventory.reserved', async (order) => {
  await scheduleShipping(order);
});`,
  },
  fanout: {
    direct: `// Direct Messaging (No Fanout)
async function processOrder(order: Order) {
  // Must explicitly call each consumer
  await emailService.notify(order);
  await smsService.notify(order);
  await pushService.notify(order);
  await analyticsService.track(order);
}`,
    fanout: `// Fanout Pattern (Pub/Sub)
// Publisher sends once
async function processOrder(order: Order) {
  await topic.publish('order.completed', order);
}

// SNS/SQS style fanout
const topic = new Topic('order-events');

// Multiple queues subscribe to same topic
topic.subscribe(emailQueue);
topic.subscribe(smsQueue);
topic.subscribe(pushQueue);
topic.subscribe(analyticsQueue);

// Each queue processes independently`,
  },
  stateful: {
    stateful: `// Stateful Server
class SessionServer {
  private sessions = new Map<string, UserSession>();

  handleRequest(req: Request) {
    const session = this.sessions.get(req.sessionId);
    if (!session) {
      throw new Error('Session not found');
    }
    // Session data stored in server memory
    session.lastAccess = Date.now();
    session.requestCount++;
    return processWithSession(req, session);
  }
}
// Problem: Can't scale horizontally easily`,
    stateless: `// Stateless Server with JWT
function handleRequest(req: Request) {
  // All state is in the token
  const token = req.headers.authorization;
  const payload = jwt.verify(token, SECRET);

  // No server-side session storage
  return processRequest(req, payload);
}

// Benefits:
// - Any server can handle any request
// - Easy horizontal scaling
// - No session synchronization needed`,
  },
  syncAsync: {
    sync: `// Synchronous / Blocking
function processOrders(orders: Order[]) {
  const results = [];
  for (const order of orders) {
    // Each call blocks until complete
    const result = processOrder(order); // Waits here
    results.push(result);
  }
  return results;
}
// Total time: sum of all processing times`,
    async: `// Asynchronous / Non-blocking
async function processOrders(orders: Order[]) {
  // Start all operations concurrently
  const promises = orders.map(order =>
    processOrder(order)
  );

  // Wait for all to complete
  const results = await Promise.all(promises);
  return results;
}
// Total time: max of all processing times`,
  },
  coupling: {
    tight: `// Tight Coupling
class OrderService {
  private emailService = new EmailService();
  private smsService = new SMSService();

  createOrder(order: Order) {
    // Direct dependencies on concrete classes
    this.emailService.send(order.userEmail, 'Order created');
    this.smsService.send(order.userPhone, 'Order created');
  }
}
// Problems: Hard to test, hard to change`,
    loose: `// Loose Coupling with Dependency Injection
interface NotificationService {
  notify(user: User, message: string): Promise<void>;
}

class OrderService {
  constructor(
    private notifications: NotificationService[]
  ) {}

  createOrder(order: Order) {
    // Depends on abstraction, not implementation
    for (const service of this.notifications) {
      service.notify(order.user, 'Order created');
    }
  }
}
// Easy to test, extend, and modify`,
  },
  hybridPatterns: {
    monolithWithEvents: `// Modular Monolith + Event-Driven
// Single deployment, but modules communicate via events

class OrderModule {
  constructor(private eventBus: InternalEventBus) {}

  async createOrder(data: OrderData) {
    const order = await this.repository.save(data);

    // Emit internal event (same process)
    await this.eventBus.emit('order.created', {
      orderId: order.id,
      items: order.items,
      userId: order.userId,
    });

    return order;
  }
}

// Other modules subscribe (same deployment)
eventBus.on('order.created', inventoryModule.reserve);
eventBus.on('order.created', analyticsModule.track);`,
    microservicesOrchestration: `// Microservices + Saga Orchestrator
// Distributed services, centralized workflow control

class OrderSagaOrchestrator {
  async execute(order: Order) {
    const saga = new Saga(order.id);

    try {
      // Step 1: Reserve inventory
      await saga.step('inventory',
        () => this.inventoryClient.reserve(order),
        () => this.inventoryClient.release(order)
      );

      // Step 2: Process payment
      await saga.step('payment',
        () => this.paymentClient.charge(order),
        () => this.paymentClient.refund(order)
      );

      // Step 3: Create shipment
      await saga.step('shipping',
        () => this.shippingClient.create(order)
      );

      await saga.complete();
    } catch (error) {
      await saga.compensate(); // Rollback in reverse
    }
  }
}`,
    lambdaWithMonolith: `// Monolith API + Lambda for Async Tasks
// Core API as monolith, heavy processing as serverless

// Main API (Express/NestJS monolith)
app.post('/api/orders', async (req, res) => {
  const order = await orderService.create(req.body);

  // Offload heavy work to Lambda via SQS
  await sqs.sendMessage({
    QueueUrl: PROCESSING_QUEUE,
    MessageBody: JSON.stringify({
      type: 'GENERATE_INVOICE',
      orderId: order.id,
    }),
  });

  return res.json(order);
});

// Lambda function (separate deployment)
export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const { type, orderId } = JSON.parse(record.body);
    if (type === 'GENERATE_INVOICE') {
      await generatePDF(orderId);
      await uploadToS3(orderId);
      await sendEmail(orderId);
    }
  }
};`,
    eventSourcingCQRS: `// Event Sourcing + CQRS
// Events as source of truth, separate read/write models

// Write side: Event Store
class OrderAggregate {
  private events: DomainEvent[] = [];

  createOrder(data: OrderData) {
    // Don't save state, emit event
    this.apply(new OrderCreatedEvent(data));
  }

  addItem(item: Item) {
    this.apply(new ItemAddedEvent(item));
  }

  private apply(event: DomainEvent) {
    this.events.push(event);
    await eventStore.append(this.id, event);
  }
}

// Read side: Projections (separate DB)
eventBus.on('OrderCreated', async (event) => {
  await readDb.orders.insert({
    id: event.orderId,
    status: 'created',
    total: 0,
  });
});

eventBus.on('ItemAdded', async (event) => {
  await readDb.orders.update(event.orderId, {
    $inc: { total: event.item.price },
  });
});`,
  },
}
