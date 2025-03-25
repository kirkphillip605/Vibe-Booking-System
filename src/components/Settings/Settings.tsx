import React from 'react';
    import VenueTypeSettings from './VenueTypeSettings';
    import ContactRoleSettings from './ContactRoleSettings';
    import ContactTypeSettings from './ContactTypeSettings';
    import ClientTypeSettings from './ClientTypeSettings';
    import ClientSegmentationSettings from './ClientSegmentationSettings';
    import PhoneTypeSettings from './PhoneTypeSettings';
    import EmailTypeSettings from './EmailTypeSettings';
    import AddressTypeSettings from './AddressTypeSettings';

    const Settings: React.FC = () => {
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Settings</h1>

          <VenueTypeSettings />
          <ContactRoleSettings />
          <ContactTypeSettings />
          <ClientTypeSettings />
          <ClientSegmentationSettings />
          <PhoneTypeSettings />
          <EmailTypeSettings />
          <AddressTypeSettings />
        </div>
      );
    };

    export default Settings;
