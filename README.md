#Data Archetypes

###Open-source JSON standards for common types of data

##Mission
  
**Data should be able to flow fast and freely between multiple applications...**  
The web is polluted with incompatible data objects.  To fix this, we need standard formats for data.  If data does not change shape, it's easier for developers to build applications that work with it, and it allows users to import pre-existing data into those applications, increasing distribution and productivity of their data.

##Benefits
**Users Can Import Their Data Into Your Application Instantly**
It's hard enough to get users.  Especially when they have to manually enter the same ol' content (Products, Blog Posts, etc..) within your app.  Using Data Archetypes they can import their data instantly, and get on with using what you've built!  
  
**Write Less Code**
C'mon, are you really going to model yet another *Product* or *Blog Post* data object?  Together, we can build perfect representations of those, that should serve most use-cases.

**Don't Hold Users' Data Hostage**
If your business plan is to hold users' data hostage so they can't leave, then that is just plain awful.  Instead, build an application that creates value out of their data, and let them know that the data they create within your application will have use elsewhere too.

**Data Liquidity**
Imagine an internet where we can instantly port our pre-existing data into new applications.  Or exit an application, knowing the data we created while using it will be usable elsewhere.

**A New Data Economy**
Applications supporting Data Archetypes will participate in a shared growth scenario.  Anywhere a user adds to their collection of Data Archetypes indirectly adds to the useage they could get out of your own application.   Together, we can build a new data economy using these standard formats, and applications supporting them will rise to the top. 


*- If this still doesn't make sense, check out [Servant](http://servant.co) which is cloud hosting for Data Archetypes.  Servant also splits its hosting revenue with applications that support Data Archetypes.*


##Overview

***STATUS: This is currently a work in progress.  We are waiting to recieve feedback on these before launching Data Archetypes Version 1 and Servant***

Given the popularity of JSON, each Data Archetype has been modeled in [JSON Schema](http://json-schema.org "http://json-schema.org") format and can be found in the `archetypes` folder.  Data Archetypes focus on are meant to be lean and contain only the essential properties/attributes that define and differentiate types of data.  The challenge is to agree on what those properties/attributes are...

**This Repo contains the following:**

 - JSON Schemas for each Data Archetype
 - Validators for each Data Archetype (The same ones that Servant uses)
 - Methods to validate instances of each Data Archetype (which Servant uses) 
 - Tests to check if the JSON Schemas are valid per the JSON SCHEMA DRAFT 4 specs
 - Tests of the validate methods

*This repo is only for defining schemas and validators for each schema.  If you're looking for helper methods to quickly instantiate valid Data Archetypes and work with them in your applications, check out the Servant SDKs.*
 
**Feel free to contribute to the existing Data Archetypes or create your own!**

---

This project was started to be used in SDKs for [Servant - The Content Management Ecosystem](http://servant.co), and represents half of Servant's strategy for building a more liquid web.  The strategy looks like this:

>**• Host User Data Separate From Applications That Use It:**  This is what [Servant](http://servant.co) does.  It's cloud hosting for User's data.  
>**• Keep User Data In Standard Formats:**  This is what Data Archetypes are, standard formats.

The benefits of this strategy are a big deal. Check out Servant if you get a chance.  Servant also splits the hosting revenue of its users with every application that integrates with Servant.

---
##Contributing
Anyone who has a Data Archetype in mind, or wants to add to existing Data Archetypes is free to contribute.  Just follow these steps:

 - Fork this project.
 - Clone your forked project (which should now be in your github account) to your computer.
 - Create a branch and work on it to create/modify existing Data Archetypes and their validators. 

More on how to contribute [here](https://guides.github.com/activities/contributing-to-open-source/).

##F.A.Q.
###As a Developer, Data Archetypes are not robust enough for my application and I need to store more data than Data Archetypes can hold (e.g. SEO data).  What should I do?
This is the most popular question and rightfully so.  You want to build a awesome application, but using Data Archetypes feels limiting...

First off, is the extra data you need specific to your application?  **95% of the time, developers want to add extra data/properties to the Archetypes which are only relevant to their particular applications**.  However, the Data Archetypes must be kept lean and comprehensible for the sake of speed and ease-of-use in all scenarios.  For instance, what use would a mobile application have for SEO data if SEO data is stored in each Archetype?

There are infinite use cases for each Data Archetype, and storing custom data for each use case would result in infinite bloat.

Instead, we recommend two approaches: 

**Extend The Data Within Your Own Application:**  Set up a database and use it to store the extra data and the Data Archetype ID to which it corresponds. 

**Propose Changes:**  If you think your extra data would suit many use-cases, propose adding it in the Issues area.

If this sounds too difficult to you, and you are leaning towards building an application that has its own custom data objects, remember that your users will have to manually enter data within your app, resulting in a barrier to entry, and redundancy that Data Archetypes strive to get rid of.  You're also building another silo for your users to get stuck in.  If that's part of your business strategy, then fine (you evil person), but we will show people that there is better way with Data Archetypes!  

Also, Servant will not only give you users but it literally splits its hosting revenue with applications that use Data Archetypes.  Immediate revenue and an awesome community that you will miss out on...
###As a User, how can I store extra data in each Archetype (e.g. obscure product details)?
Data Archetypes aren't going to be perfect for everyone.  But don't let the perfect be the enemy of good.  

Occasionally, you may not be able to find room to squeeze in obscure details.  On the other hand, Data Archetypes radically increase distribution and productivity of your data.  

**Yes, you may miss a small detail, but more importantly, you will be able to show and use your data EVERYWHERE.**



