import {ApiItem, EnvoyFleetItem, ServiceItem, StaticRouteItem} from '@redux/services/kuskApi';

interface MainState {
  /** API server endpoint */
  apiEndpoint: string;
  /** content of the new publishing API */
  newApiFormContent: {[key: string]: any} | null;
  /**  currently selected API */
  selectedApi: ApiItem | null;
  /**  currently selected API */
  selectedApiOpenapiSpec: any | null;
  /**  currently selected Envoy Fleet */
  selectedEnvoyFleet: EnvoyFleetItem | null;
  /**  currently selected Static Route */
  selectedStaticRoute: StaticRouteItem | null;
  selectedStaticRouteSpec: any | null;
  /**  selected api changed settings */
  selectedApiNewSettings: {[key: string]: any} | null;
}

interface ApiContent {
  name: string;
  namespace: string;
  envoyFleetName: string;
  envoyFleetNamespace: string;
  openapi: {[key: string]: any};
}
interface ServicesData {
  isLoading: boolean;
  items: ServiceItem[];
  error?: string;
}

interface StaticRoute {
  apiVersion: string;
  kind: string;
  metadata: Metadata;
  spec: StaticRouteSpec;
}

interface Metadata {
  name: string;
}

interface StaticRouteSpec {
  fleet: Fleet;
  hosts: string[];
  redirect: Redirect;
  upstream: Upstream;
}

interface Fleet {
  name: string;
  namespace: string;
}

type HTTP_METHOD = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch';

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

type PathMatch = PartialRecord<HTTP_METHOD, PathMethod>;

type PathMethod = {
  redirect: Redirect;
  route: Route;
};

interface Redirect {
  scheme_redirect: 'http' | 'https';
  host_redirect: string;
  path_redirect: string;
  port_redirect: number;
  response_code: string;
  rewrite_regex: Rewrite;
}

interface Rewrite {
  pattern: string;
  substitution: string;
}

interface Route {
  cors?: Cors;
  qos?: Qos;
  upstream: Upstream;
  websocket?: boolean;
}

interface Cors {
  credentials: boolean;
  expose_headers: string[];
  headers: string[];
  max_age: number;
  methods: string[];
  origins: string[];
}

interface Qos {
  idle_timeout: number;
  request_timeout: number;
  retries: number;
}

interface Upstream {
  host: Host;
  rewrite: Rewrite;
  service: Service;
}

interface Host {
  hostname: string;
  port: number;
}

interface Service {
  name: string;
  namespace: string;
  port: number;
}

interface StaticRouteForm {
  routeInfo: {
    name: string;
    namespace: string;
  };
  fleetInfo: {
    targetEnvoyFleet: string;
  };
  paths: {
    paths: Array<{
      path: {
        name: string;
        methods: HTTP_METHOD[];
      };
      upstream: {
        service: {
          name: string;
          namespace: string;
          port: number;
        };
        host: {
          hostname: string;
          port: number;
        };
        rewrite: {
          pattern: string;
          substitution: string;
        };
      };
      redirect: {
        scheme_redirect: 'http' | 'https';
        path_redirect: string;
        host_redirect: string;
        port_redirect: number;
        response_code: string;
        strip_query: string;
        rewrite_regex: {
          pattern: string;
          substitution: string;
        };
      };
      qos: {
        idle_timeout: number;
        retries: number;
        request_timeout: number;
      };
      cors: {
        origins: Array<string>;
        methods: Array<string>;
        headers: Array<string>;
        expose_headers: Array<string>;
        credentials: boolean;
        max_age: number;
      };
      websocket: {
        websocket: boolean;
      };
    }>;
  };
  hosts: {
    hosts: Array<string>;
  };
}

export type {ApiContent, MainState, ServicesData, StaticRoute, HTTP_METHOD, PathMatch, StaticRouteForm};
