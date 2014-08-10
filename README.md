#Data Archetypes

####JSON Schemas that aim to become standards for common types of data
  
>**Data should be able to flow fast and freely between multiple applications...**  
>To achieve this, we need standard formats for common types of data.  If data does not change shape, it's easier for developers to build applications that work with it, plus it's easier for users to adopt those applications, and increase productivity of their data.

Data Archetypes focus on containing only the essential properties/attributes that define and differentiate each type of common data.

##F.A.Q.
####As a developer, how can I store extra data in each Archetype (e.g. SEO data)?
95% of the time, developers want to add extra data/properties to the Archetypes which are only relevant to their particular applications.  However, the Data Archetypes must be kept lean and comprehensible for the sake of speed and ease-of-use in all scenarios.  For instance, what use would a mobile application have for SEO data if SEO data is stored in each Archetype?

There are infinite use cases for each Data Archetype.  Therefore, storing custom data for each use case would result in infinite bloat.

Instead, we recommend two approaches: 

**Extend The Data Within Your Own Application:**  Set up a database and use it to store the extra data and the Data Archetype ID to which it corresponds. 

**Propose Changes:**  If you think your extra data would suit many use-cases, propose adding it in the Issues area.

####As a user, how can I store extra data in each Archetype (e.g. obscure product details)?
Data Archetypes aren't going to be perfect for everyone.  But don't let the perfect be the enemy of good.  Occassionally, you may not be able to find room to squeeze in obscure details.  On the other hand, Data Archetypes radically increase distribution and use of your data.  Yes, you may miss a small detail, but at least you will be able to show and use the rest of your data EVERYWHERE.




** Servant (http://servant.co) hosts these Data Archetypes in the cloud on behalf of users and splits its hosting revenue with developers who build applications that use Data Archetypes.