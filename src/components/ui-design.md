- Index / - responsible for Auth
  - App - loads app components
    - UserProfile - shows logged in user
      - ProfilePicture
      - ProfileDetails
    - AppHeader - indicates to user where they are
    - NavSidebar - allows user navigation
      - CampaignDetails
        - CampaignHeader
        - CharacterList
        - CampaignViews
        - CampaignOptions
      - CreateCampaign
    - CharacterSheet /{campaign}/{character} - holds sheet state
      - CharDetails
      - CharType
      - AbilitiesTable...
    - Campaign /{campaign} GM view?


NEED CONTEXT BASED LOADING AND SAVING OF UPDATES TO STATE
NEED URL BASED ROUTING
