---
title: Custom .NET and local functions
description: Extract business logic from BizTalk assemblies and choose local functions or independent services deliberately.
---

# Adapt code at the right boundary

Identify whether an assembly contains pure business logic or depends on BizTalk runtime types, message context, pipeline interfaces, registry configuration or installed native libraries. Referencing the old assembly unchanged is not sufficient if those dependencies are missing.

## Separate reusable logic from runtime adapters

Refactor the reusable function to accept explicit data and return an explicit result:

```csharp
public static string NormalizeCustomerCode(string value)
{
    if (string.IsNullOrWhiteSpace(value))
        throw new ArgumentException("Customer code is required.", nameof(value));

    return value.Trim().ToUpperInvariant();
}
```

This is plain business logic, not a deployable local-function entry point. Generate the runtime wrapper using the current Standard tooling. Test null/empty input, whitespace, casing and non-ASCII values against the existing contract; changing normalization can be a behavioral change.

## Local function or separate service?

| Need | Consider |
| --- | --- |
| Workflow-specific .NET logic sharing the app lifecycle | Standard local function |
| Reuse across independently deployed applications | Separate service/Function app with a defined API |
| Independent scaling, security boundary or release cadence | Separate service |
| Long-running or streaming pipeline processing | A suitable streaming/worker design; do not assume local-function compatibility |

The [local-function documentation](https://learn.microsoft.com/en-us/azure/logic-apps/create-run-custom-code-functions) lists limits, including execution beyond ten minutes and BizTalk streaming pipeline components. Check current runtime/tooling support before porting such code.

## Implementation checks

1. Generate a Standard workspace with local-function support using the documented tooling.
2. Add compatible assemblies/packages and make configuration explicit.
3. Invoke the generated function action from the workflow; do not invent a function signature or binding by copying an unrelated Function app.
4. Keep external calls bounded by timeouts and cancellation. Avoid static mutable state as a durable store.
5. Propagate typed failures to an explicit workflow error path; do not return a success-shaped empty object on failure.
6. Deploy the workflow and required function binaries together and test the actual target host.

## Troubleshooting

| Failure | Check |
| --- | --- |
| Assembly load / type error | Target framework, package versions, native dependencies and build output |
| Works in a desktop test but not the runtime | File/registry assumptions, permissions, architecture and missing configuration |
| Serializes differently | Date/time format, decimal culture, null handling and XML namespaces |
| High memory use | In-memory payload copies, concurrency and accidental replacement of streaming |
| Duplicate side effects after retry | Whether function execution is idempotent and how the workflow retries it |

Start with the [local transformation lab](./workshop.md) to isolate data behavior before introducing runtime-dependent custom code.
