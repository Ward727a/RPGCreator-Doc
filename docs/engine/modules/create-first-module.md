---
sidebar_position: 2
---
# Create your first module

In this section, you will learn how to create your first module for the engine.
As said inside the [Before We Start](./before-we-start.md) page, you will need to have some knowledge of C# and .NET, this tutorial will not cover the basics of C# and .NET!

## Create a new project

Create a new project, you should choose the `Class Library` template, and make sure to target `.NET 10.0` or higher.

Once the project is created, you should have a `Class1.cs` file, you can (if you want) rename it to something more relevant to your module, for example `MyModule.cs`.

## Add reference to the engine

For the module to be able to use the engine's API, you need to add some references.
Each reference is a `.dll` file that you can find in your RPG Creator Engine installation folder.

The only hard requirement is to reference the `RPGCreator.SDK.dll` file, as it contains the core API of the engine.

Every other reference is optional, and you can reference them to extend the functionality of your module.

For example, you could reference the `RPGCreator.UI.dll` file to be able to create custom UI for your module.

Or you could reference the `RPGCreator.Core.dll` file to be able to use different core features of the engine.

Be warned that referencing each file will increase the number of dependencies your module has!

The SDK is made to be used with the less amount of dependencies possible, it defines the 'contracts' of the engine,
in fact, all the features of the engine are defined or are using the SDK in someway, so you can do a lot of things with just referencing the SDK.

## Create a module class

To create a module, you have to create a class that inherits from the `BaseModule` class, this class is defined in the SDK.
It allows the engine to recognize your class as a module, and be able to load it, and check for each dependency of the module.

You will also need to add the `ModuleManifest` attribute to your class, as an assembly attribute.

Here is an example of a basic module class:

```csharp
using RPGCreator.SDK; // This is the core namespace of the SDK.
using RPGCreator.SDK.Logging; // This is the namespace for the logging system of the SDK.

// This is the 'identity card' of your module, it contains all the information about your module, and is used to load it.
// For security reasons, we decided to make it an assembly attribute, so it can be read without loading the module.
// This allows the user to check the information of the module, and decide if they want to trust it or not, before loading it.
// WITHOUT THIS, THE ENGINE WILL BE UNABLE TO LOAD THE MODULE!
[assembly: ModuleManifest(
    // This is the unique identifier for your module, it should be in this format: "yourname://module/module_name", 
    // you can replace "yourname" with your name or your company's name, and "module_name" with the name of your module.
    urn: "yourname://module/module_name",
    
    // The name of your module, this is the name that the user will see, and can be anything (not necessarily unique).
    name: "My Module", 
    
    // The author of the module (you probably), this is optional, but it's good to have it.
    Author: "Your Name", 
    
    // The version of the engine that your module is compatible with, 
    // this is REQUIRED, and should be in the format "major.minor.patch", for example "1.0.0".
    TargetEngineVersion: "1.0.0",
    
    // A description of your module, this is optional, but it's good to have it.
    Description: "This is my first module!", 
    
    // A list of dependencies for your module, this is optional, but if your module depends on other modules,
    // you should list their URNs here, for example: ["otherauthor://module/other_module"]
    Dependencies: [],
    
    // A list of incompatibilities for your module, this is optional, but if your module is incompatible with other modules,
    // you should list their URNs here, for example: ["otherauthor://module/other_module"]
    Incompatibilities: []
)]

public class MyModule : BaseModule
{
    // Here, you can override the methods of the BaseModule class to add functionnality,
    // we will add some examples here, but you should check the SDK documentation, or directly the BaseModule class.
    protected override void OnInitialize()
    {
        // This method is called when the module is initialized, you can use it to initialize your module, for example, by registering some custom features.
        // This is only called once, and is called before any other method of the module is called.
        // This is called ONLY if the module is enabled by the user.
        Logger.Info("MyModule has been initialized! =)");
    }
    
    protected override void OnShutdown()
    {
        // This method is called when the module is shutdown, you can use it to clean up your module, for example, by unregistering some custom features.
        // This is only called once, and is called after all other method of the module is called.
        // This is called ONLY if the module is disabled by the user, or the engine is shutdown.
        Logger.Info("MyModule has been shutdown! =(");
    }
}
```

This is a very basic module, it doesn't do anything, but it's enough to be loaded by the engine, and be recognized as a module.

## Note on the `EngineSecurityToken` type

In some methods of the `BaseModule` class, you will probably see a parameter of type `EngineSecurityToken`, this is a special type
that is used to check if the method has been called by the engine or not.

Due to how the engine is made (fully modular), there is no way to be sure that a method is only called by the engine, and not by a module.

For example, the `OnInitialize` method is called by the engine when the module is initialized, but there is nothing preventing a module from calling it directly.
Due to that, the `EngineSecurityToken` type is used to check if the method is directly called by the engine or not.

**Please note:** If you try to call a method that has an `EngineSecurityToken` parameter, and you try to pass `null` or any other value,
the method will throw an exception, shutdown the module, and log a fatal error with all information related to the attempt, such as:
- The name of the method that was called.
- The stack trace of the call.
- The name of the module that made the call (if it can be determined).
- The exact line of code that made the call (if it can be determined).
- The date and time of the attempt.

In this case, and if reported to the RPG Creator team, this can lead to a ban of the author from all official RPG Creator platforms,
and a ban of the module from being loaded by the engine, as this is a very serious violation of the security rules of the engine!

Obviously, the `EngineSecurityToken` type is not something that you can create or get!
And finally, we will not ban you for accidentally calling a method with a `null` token, but if (once reported to you) you do not fix it, or do it again, then we will have to take action.

