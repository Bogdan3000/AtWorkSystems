export const sections = {
    sales: {
        title: 'sales.title',
        subsections: {
            marketing: { title: 'sales.marketing.title', icon: 'fa-bullhorn', file: '/content/sales/marketing.html' },
            prospects: { title: 'sales.prospects.title', icon: 'fa-address-book', file: '/content/sales/prospects.html' },
            crm:       { title: 'sales.crm.title', icon: 'fa-users-cog', file: '/content/sales/crm.html' },
            inquiry:   { title: 'sales.inquiry.title', icon: 'fa-question-circle', file: '/content/sales/inquiry.html' },
            offers:    { title: 'sales.offers.title', icon: 'fa-file-invoice', file: '/content/sales/offers.html' },
            kpi:       { title: 'sales.kpi.title', icon: 'fa-chart-line', file: '/content/sales/kpi.html' },
            orders:    { title: 'sales.orders.title', icon: 'fa-shopping-bag', file: '/content/sales/orders.html' },
            contact:   { title: 'sales.contact.title', icon: 'fa-phone', file: '/content/sales/contact.html' }
        }
    },
    purchasing: {
        title: 'purchasing.title',
        subsections: {
            audits:       { title: 'purchasing.audits.title', icon: 'fa-search', file: '/content/purchasing/audits.html' },
            orders:       { title: 'purchasing.orders.title', icon: 'fa-file-alt', file: '/content/purchasing/orders.html' },
            confirmation: { title: 'purchasing.confirmation.title', icon: 'fa-check-circle', file: '/content/purchasing/confirmation.html' },
            suppliers:    { title: 'purchasing.suppliers.title', icon: 'fa-handshake', file: '/content/purchasing/suppliers.html' },
            misc:         { title: 'purchasing.misc.title', icon: 'fa-folder-open', file: '/content/purchasing/misc.html' },
            kpi:          { title: 'purchasing.kpi.title', icon: 'fa-chart-bar', file: '/content/purchasing/kpi.html' }
        }
    },
    production: {
        title: 'production.title',
        subsections: {
            projects:  { title: 'production.projects.title', icon: 'fa-project-diagram', file: '/content/production/projects.html' },
            hse:       { title: 'production.hse.title', icon: 'fa-shield-alt', file: '/content/production/hse.html' },
            kpi:       { title: 'production.kpi.title', icon: 'fa-tachometer-alt', file: '/content/production/kpi.html' },
            surveys:   { title: 'production.surveys.title', icon: 'fa-clipboard-check', file: '/content/production/surveys.html' },
            transport: { title: 'production.transport.title', icon: 'fa-truck', file: '/content/production/transport.html' }
        }
    },
    resources: {
        title: 'resources.title',
        subsections: {
            planning:   { title: 'resources.planning.title', icon: 'fa-calendar-alt', file: '/content/resources/planning.html' },
            vehicles:   { title: 'resources.vehicles.title', icon: 'fa-car', file: '/content/resources/vehicles.html' },
            properties: { title: 'resources.properties.title', icon: 'fa-building', file: '/content/resources/properties.html' }
        }
    },
    inventory: {
        title: 'inventory.title',
        subsections: {
            goods:    { title: 'inventory.goods.title', icon: 'fa-boxes', file: '/content/inventory/goods.html' },
            receipt:  { title: 'inventory.receipt.title', icon: 'fa-truck-loading', file: '/content/inventory/receipt.html' },
            freight:  { title: 'inventory.freight.title', icon: 'fa-file-invoice-dollar', file: '/content/inventory/freight.html' },
            picklist: { title: 'inventory.picklist.title', icon: 'fa-clipboard-list', file: '/content/inventory/picklist.html' },
            overview: { title: 'inventory.overview.title', icon: 'fa-warehouse', file: '/content/inventory/overview.html' }
        }
    },
    personnel: {
        title: 'personnel.title',
        subsections: {
            time:      { title: 'personnel.time.title', icon: 'fa-clock', file: '/content/personnel/time.html' },
            logbook:   { title: 'personnel.logbook.title', icon: 'fa-road', file: '/content/personnel/logbook.html' },
            employees: { title: 'personnel.employees.title', icon: 'fa-users', file: '/content/personnel/employees.html' },
            kpi:       { title: 'personnel.kpi.title', icon: 'fa-stopwatch', file: '/content/personnel/kpi.html' },
            todo:      { title: 'personnel.todo.title', icon: 'fa-tasks', file: '/content/personnel/todo.html' }
        }
    }
};
