---
sidebar_position: 1
---

# Introduction

In this section, you will be able to know more about the modules feature of the engine, how it works, and how to create your own modules.

:::info

The module feature is still in development, and will be updated as the engine evolves.

To create your own module, you need to have some knowledge of C# and .NET.
:::

## One rule to follow

Due to the nature of the module system, and the engine's architecture, there is not many rules or limit for the module system.

**BUT** there is still one rule that you need to follow when creating your own module:
- **Do not, in ANY circumstance, call any method or try to access, create, or manipulate any method with the `EngineSecurityToken` parameter.**

If you do, your module will literally make the engine fatal crash, and will log a fatal error with all the information related to the attempt, such as:
- The name of the method that was called.
- The stack trace of the attempt.
- The name of the module that made the attempt (if it can be determined).
- The exact line of code that made the attempt (if it can be determined).
- The date and time of the attempt.

This was made to protect as much as we possibly can (without making the engine too much closed) the engine from any malicious module.

To reassure you:

There is very little methods that have the `EngineSecurityToken` parameter, and they are all very specific methods that are only meant to be called by the engine, and not by modules.

If you still want to create a module that needs to call a method with the `EngineSecurityToken` parameter, you can contact us on our Discord server, and we will see if we can find a solution together that doesn't involve breaking the engine's security.

If, by some reason, you found a method with the `EngineSecurityToken` parameter that you think should be accessible to modules, please report it to us.
In this case, we will review the method, and if we think that it can be safely accessible to modules, we will make it accessible in a future update of the engine.