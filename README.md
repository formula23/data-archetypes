#Data Archetypes

###Open-source JSON standards for common types of data.
  
>**Data should be able to flow fast and freely between multiple applications...**  
>To achieve this, we need standard formats for data.  If data does not change shape, it's easier for developers to build applications that work with it, and it allows users to import pre-existing data into those applications, increasing productivity of their data.

**This Project Is A Work In Progress**

Given the popularity of JSON, each Data Archetype has been modeled in [JSON Schema](http://json-schema.org "http://json-schema.org") format.  Data Archetypes focus on containing only the essential properties/attributes that define and differentiate types of data.

Feel free to contribute to the existing Data Archetypes or create your own!

---

This project was started for [Servant - The Content Management Ecosystem](http://servant.co), and represents half of Servant's strategy for building a more liquid web.  The strategy looks like this:

>**• Host User Data Separate From Applications That Use It:**  This is what [Servant](http://servant.co) does.  It's cloud hosting for User's data.  
>**• Keep User Data In Standard Formats:**  This is what Data Archetypes are, standard formats.

The benefits of this strategy are a big deal. Check out Servant if you get a chance.  Servant also splits the hosting revenue of its users with every application that integrates with Servant.

---
##Getting Started
Install the DataArchetypes...

    npm install data-archetypes
    
Require the module and instantiate.

    var DataArchetypes = require('../index');
	var DATs = new DataArchetypes();
	
Validate an instance of a DataArchetype

    // Create an instance of a product
    var instance = {
		title: Product1,
		price: 1999,
		seller: 'The Store'
	};
	
    // Validate that instance
	DATs.validateProduct(instance, function(errors, product) {
		if (errors) {
		    console.log(errors)
		} else {
		    console.log(product)
		}
	});

##Contributing
Anyone who has a Data Archetype in mind, or wants to add to existing Data Archetypes is free to contribute.  Just fork this project, create a branch, and then submit a pull request to contribute.  More on how to contribute [here](https://guides.github.com/activities/contributing-to-open-source/).

##F.A.Q.
###As a Developer, how can I store extra data in each Archetype (e.g. SEO data)?
95% of the time, developers want to add extra data/properties to the Archetypes which are only relevant to their particular applications.  However, the Data Archetypes must be kept lean and comprehensible for the sake of speed and ease-of-use in all scenarios.  For instance, what use would a mobile application have for SEO data if SEO data is stored in each Archetype?

There are infinite use cases for each Data Archetype.  Therefore, storing custom data for each use case would result in infinite bloat.

Instead, we recommend two approaches: 

**Extend The Data Within Your Own Application:**  Set up a database and use it to store the extra data and the Data Archetype ID to which it corresponds. 

**Propose Changes:**  If you think your extra data would suit many use-cases, propose adding it in the Issues area.

###As a User, how can I store extra data in each Archetype (e.g. obscure product details)?
Data Archetypes aren't going to be perfect for everyone.  But don't let the perfect be the enemy of good.  Occasionally, you may not be able to find room to squeeze in obscure details.  On the other hand, Data Archetypes radically increase distribution and use of your data.  Yes, you may miss a small detail, but more importantly you will be able to show and use your data EVERYWHERE.



