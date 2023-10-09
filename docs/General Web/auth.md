---
title: 'Auth'
---

## Identify Users Across Sessions by Cookies

We can uniquely identify each user by generating a unique `id` (e.g. using `uuid`) and use it in _cookie_ during the initial load if there's no existing user ID cookie present.  
Note that users can work around this by using different browsers or on different devices. The only way to prevent this sort of abuse is to have user authentication.
