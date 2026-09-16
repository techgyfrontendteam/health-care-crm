# Frontend architecture

The application follows a feature-first structure with a small shared kernel.

```text
app/                 Redux store and application-wide providers
features/<feature>/  Business modules owned by one domain
  api/               RTK Query endpoint definitions
  components/        Feature-only UI
  pages/             Route-level UI
  store/             Feature state not owned by RTK Query
  types/             Domain request, response, and view-model types
shared/              Domain-neutral code reusable by multiple features
  api/               Shared API transport and file APIs
  components/        Reusable composed UI
  hooks/             Reusable application hooks
  utils/             Framework-neutral utilities
components/ui/       Low-level design-system primitives
layouts/             Route shells
routes/              Route declarations and access boundaries
config/              Static application configuration
notifications/       Cross-cutting notification integration
features/integrations/ Provider callbacks and operational integration APIs
```

## Dependency direction

Dependencies flow inward in this order:

```text
routes/layouts -> features -> shared -> components/ui
                       \-> app state/providers
```

- `shared` must not import from feature UI. The shared API transport may import
  authentication actions because authentication is application infrastructure.
- A feature owns its API, types, pages, and feature-only components.
- Cross-feature imports are allowed only for an intentional public capability,
  such as a query hook or shared domain type. Use the `@/` alias for them.
- Generic components must move to `shared/components`; Radix-style primitives
  stay in `components/ui`.
- Application-wide React providers are composed only in
  `app/providers/AppProviders.tsx`.
- Environment access belongs at infrastructure boundaries such as
  `shared/api/baseApi.ts`, not inside pages or components.

## Naming

- API modules: `<domain>Api.ts`
- Route components: `<Name>Page.tsx`
- Reusable components: `<Name>.tsx`
- Hooks: `use<Name>.ts`
- Domain types: `types/index.ts` until the domain becomes large enough to split
- Avoid `Slice` in RTK Query filenames; reserve it for `createSlice` state.

## Adding a feature

1. Create `features/<feature>/{api,components,pages,types}` as needed.
2. Inject backend endpoints through `shared/api/baseApi.ts`.
3. Keep response normalization inside the API module.
4. Expose a route-level component from `pages` and register it in `routes`.
5. Move code to `shared` only after at least two features genuinely reuse it.
