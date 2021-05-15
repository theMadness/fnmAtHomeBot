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

const authorHasRole = (msg, roles) => msg.member.roles.cache.some(
    (role) => roles.includes(role.name),
);

const canManageHopper = (msg) => true;

const canRequestCode = (msg) => whiteList.codeChannels.includes(msg.channel.name) &&
  authorHasRole(msg, whiteList.codeRoles);

exports = {
  canManageHopper,
  canRequestCode,
};
