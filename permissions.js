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

const rolesContain = (haystack, needles) => haystack.cache.some((role) => needles.includes(role.name));

const canManageHopper = (msg) => msg.client.guilds.cache.some((guild) => rolesContain(guild.roles, whiteList.hopperManagementRoles));

const canRequestCode = (msg) => whiteList.codeChannels.includes(msg.channel.name) &&
  rolesContain(msg.member.roles, whiteList.codeRoles);

module.exports = {
  canManageHopper,
  canRequestCode,
};
