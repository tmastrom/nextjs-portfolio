---
title: 'User Auth by Email Invite with Auth0 and Django'
date: '2021-03-19'
---

<br>

At [Audette](https://audette.io/) we wanted to add functionality for users to invite new users from inside our app. We have a React frontend and Django backend and we are using Auth0 for authenticating users. In this post I am going to share how we implemented this feature in our Django backend and some things to watch out for. 

<br>

We were already using Auth0 for user authentication so it made the most sense to utilize Auth0 for setting up this new user flow. Auth0 documentation is quite good and I followed these [Auth0 docs](https://auth0.com/docs/auth0-email-services/send-email-invitations-for-application-signup?_ga=2.204951952.1896087452.1614039318-117113385.1608331188). 

<br>

The steps for this user flow are as follows:  
<br>

1. New user receives an email containing a link to setup their account
2. New user follows that link to activate their account
3. The user is redirected to the login page for our application

<br>

# Overview
<br>
These are the high level steps we followed 
<br>

1. Get the Auth0 Management API Key
2. Set up an external email server
3. Create a new Auth0 user account for the invited user
4. Send a Password Reset Email
5. Customize the Email Template

<br>

# 1. Get Auth0 Management API Token 

<br>

### Prerequisites: 

  1. [Create a Machine-to-Machine (M2M) Application](https://auth0.com/docs/tokens/management-api-access-tokens/create-and-authorize-a-machine-to-machine-application) in Auth0 for the Backend

<br>

  2. Authorize your M2M Application

      * In Auth0 navigate to APIs → Auth0 Management API → Machine to Machine Applications
      * Authorize your Machine to Machine app 
      * Grant the create:users permissions (scopes) to this client

Use the arrow beside the Authorize toggle to add the scopes. 

<br> 

!["Grant Permissions"](/images/scopes_arrow.jpg "Grant Permissions/Scopes")

<br>

This part had me stumped for a minute as I was setting the scopes in the permissions tab of my backend API. If you see the following screen, you're in the wrong place. 

<br>

!["Incorrect Permissions"](/images/wrongpermissions.jpg "Incorrect Permissions")

<br>

Don't make the same mistake I did!

<br>

  3. Create a Database Connection and Authorize your backend M2M app
<br>
      Navigate to Connections → Database → Username-Password-authentication

<br>
<br>

## Geting the Auth0 Management API Token

<br>

The first thing we want to do is create a new Auth0 user account for the invited user. Auth0 has the Management API for that. The Management API allows the backend application to perform admin functions such as creating and deleting user accounts in Auth0. 

<br>

"To call the Auth0 Management API v2 endpoints, you need to authenticate with an access token called the Auth0 Management API token. These tokens are JSON Web Tokens (JWTs) which contain specific grant permissions known as scopes."

<br>

We created an endpoint in our Django backend application to fetch the token. For security, the token expires periodically and must be fetched again. We accomplished this using a CRON job to run our fetch token endpoint to refresh our token when it expires. 

<br>

The request parameters are:

<br>

![Management API Token Request Parameters](/images/req_params.jpg "API Token Request Parameters")
[docs]( https://auth0.com/docs/tokens/management-api-access-tokens/get-management-api-access-tokens-for-production)

<br>

The fetch request looks something like this.

```python
mgmt_api_headers = { 'content-type': "application/json" }

data =  {
    'client_id': CLIENT_ID, 
    'client_secret': CLIENT_SECRET, 
    'audience':f'https://{TENANT_NAME}.auth0.com/api/v2/',
    'grant_type':"client_credentials"
}

response = requests.post(
    f'https://{TENANT_NAME}.auth0.com/oauth/token',
    headers=mgmt_api_headers,
    data=json.dumps(data)
    )
```

<br>

Ensure you are saving this sensitive information in a secure way. 

<br>

# 2. Mail Server Setup
<br>

### Prerequisites:
<br>

1. A Gmail Account
2. Turn on less secure app access 

<br>

Turn on less secure app access by going to the security tab of your Google Account. Gmail has an SMTP server that can be used and we set it up as shown below. 

<br>

![Email Server Setup](/images/smtp_settings.jpg "SMTP Server Settings")

<br>

# 3. Create a New Auth0 User
<br>

Now that we have the token set up we can use the management API token to create a new user from our Django endpoint.

<br>

```python
# Create a temporary password to initialize the account
temp_pass = generate_random_pwd()

auth_headers = { 
    'content-type': "application/json", 
    'authorization': f"Bearer {token}"
    }

data = {
    "email": user_email, 
    "connection": "Username-Password-Authentication", 
    "email_verified": False, 
    "password": temp_pass
    }

response = requests.post(
    f'https://{settings.AUTH0_TENANT_NAME}.auth0.com/api/v2/users', 
    headers=auth_headers, 
    json=data
    )
```
<br><br>

# 4. Send User Invite Email

<br>
We can use Auth0's Authentication API to send our custom password reset email to the user as an invite. 

```python
headers = { 
    'content-type': "application/json" 
    }

post_password_change_body = {
    "client_id": CLIENT_ID, 
    "email": user_email, 
    "connection": "Username-Password-Authentication"
    }

password_change_response = requests.post(
    f'https://{TENANT_NAME}.auth0.com/dbconnections/change_password', 
    headers=headers, 
    json=post_password_change_body
    )
```
<br>

# 5. Customizing the Email Template

We are commandeering the Change Password email template for our user sign up. When a user is invited we want them to receive an email like 

<br>

!["You're Invited to Join Audette"](/images/invite_email.jpg "Audette Invite Email")

<br>

but if they are an existing user resetting their password, we want to send them a different email body like

<br>

!["Reset Password"](/images/pwd_reset_email.jpg "Audette Password Reset Email") 

<br>

Auth0 email templates support Liquid syntax so we used a conditional to check if the user is logging in the first time or an existing user is resetting their password. 

<br>

For example our subject line is conditionally set like this 

<br>

```{% if user.email_verified %} Reset Your Password {% else %} You are invited to join Audette! {% endif %}```

<br>

We also used this in the email body. 

<br>

## Universal Login

This step is optional but is simple and nice to customize. 

<br>

Navigate to the Universal Login tab where you can set your logo and colour scheme the user sees when logging in. 

<br>

![Universal Login](/images/universal_login.jpg "Universal Login")
<br>

And that's it! We now have a clean and simple custom email invite user flow in our application! 
