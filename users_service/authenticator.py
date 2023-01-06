import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountRepo, AccountOut, Account


# modify this to match up with our code:

# accounts.get => this should be the method we created to get an account.
# for ex: if could be: accounts.get_one =>if our method was named def get_one()

# AccountRepo: this would be the name of our Repo model
# same for AccountIn, AccountOut, etc.

SIGNING_KEY = os.environ.get("SIGNING_KEY")


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountRepo,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: AccountRepo = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: AccountOut):
        # Return the encrypted password value from your
        # account object
        return account.hashed_password

    def get_account_data_for_cookie(self, users: Account):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return users.email, AccountOut(**users.dict())


authenticators = MyAuthenticator(SIGNING_KEY)
