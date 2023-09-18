# insomnia-plugin-profile-picker

## Overview
The Profile Picker plugin streamlines your API testing process by allowing you to maintain multiple profiles and switch between them seamlessly.  
What's more, you can dynamically use profile data as Tags for your requests. Enhance your testing capabilities by mapping your data directly to your Collection environment variables, combining the power of both Environment and Profile.


## Installation

1. Start Insomnia,
2. Click "Application" -> "Preferences" and choose the "Plugins" tab,
3. Enter insomnia-plugin-profile-picker and click "Install Plugin",
4. Close the dialog.

## Usage

### Creating a profile

1. Click on the Document dropdown menu.
2. Select "Create profile"
3. Enter a name for your profile.

![Screenshot1](https://github.com/Nerwin/insomnia-plugin-profile-picker/blob/main/assets/Screenshot-1.png?raw=true)

![Screenshot2](https://github.com/Nerwin/insomnia-plugin-profile-picker/blob/main/assets/Screenshot-2.png?raw=true)

Your profiles will be listed in the Document dropdown menu. The active profile will be marked with a check icon. Switch between profiles by clicking on a profile name.

![Screenshot3](https://github.com/Nerwin/insomnia-plugin-profile-picker/blob/main/assets/Screenshot-3.png?raw=true)

### Adding profile data

1. With your desired profile active, click on the Document dropdown menu.
2. Choose "Add to profile"
3. Provide a name and a value for your data, using a ":" as a separator.

***To update an existing data, use the same name and give it a new value.***

![Screenshot4](https://github.com/Nerwin/insomnia-plugin-profile-picker/blob/main/assets/Screenshot-4.png?raw=true)

![Screenshot5](https://github.com/Nerwin/insomnia-plugin-profile-picker/blob/main/assets/Screenshot-5.png?raw=true)

### Managing profile data

1. Click on the Document dropdown menu
2. Select "Manage profile"
3. View a list of your profile data
4. To delete specific data, double-click on the "x" icon next to the data

![Screenshot6](https://github.com/Nerwin/insomnia-plugin-profile-picker/blob/main/assets/Screenshot-6.png?raw=true)

### Using profile data

#### Retrieve Tags
To access profile data, leverage the dynamic template tags the plugin provides  

Search for "Current Profile" or "Profile" in the tags list  
All your profile data will be available as Tags. Use them in your request just like any other Tag  

![Screenshot7](https://github.com/Nerwin/insomnia-plugin-profile-picker/blob/main/assets/Screenshot-7.png?raw=true)

#### Mapping profile data to environment variable

Create a profile data entry with the name of the environment variable as its value  

**Example**: If your environment variable is user1Email, create a profile data entry like: `email:user1Email`

The plugin will attempt to fetch the environment variable's value and use it as the Tag's value. If the variable isn't found, the plugin will use the provided value  


![Screenshot7](https://github.com/Nerwin/insomnia-plugin-profile-picker/blob/main/assets/Screenshot-8.png?raw=true)

![Screenshot7](https://github.com/Nerwin/insomnia-plugin-profile-picker/blob/main/assets/Screenshot-9.png?raw=true)

### Deleting a profile

1. Click on the Document dropdown menu
2. Choose "Delete Profile."
3. A modal will display your profiles
4. Double-click on the "x" icon next to any profile to delete it
5. Click "Finish" to confirm
---

## Credits

Inspiration drawn from [insomnia-plugin-user-picker](https://www.github.com/gabrieljsilva/insomnia-plugin-user-picker)

## Author

Developed by [Nerwin](https://www.github.com/nerwin)
