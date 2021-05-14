const whiteList = {
  codeChannels: [
    'events-and-fnm',
  ],
  codeRoles: [
    'Admin',
    'Admin assistant',
    'Staff',
    'Moderator',
  ],
  hopperManagementRoles: [
    'Staff',
    'Admin assistant',
  ],
};

const canManageHopper = msg => true;

const canRequestCode = msg => whiteList.codeChannels.includes(msg.channel.name)
  && authorHasRole(msg, whiteList.codeRoles);

exports = {
  canManageHopper,
  canRequestCode,
};