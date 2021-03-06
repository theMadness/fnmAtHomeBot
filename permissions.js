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

/**
 * @callback Predicate
 * @param {*} item
 * @return Promise<Boolean>
 */

/**
 * @param {Array} arr
 * @param {Predicate} predicate
 * @return {Boolean}
 */
const asyncSome = async (arr, predicate) => {
  for (const e of arr) {
    if (await predicate(e)) return true;
  }
  return false;
};

/**
 * @param {GuildMemberRoleManager} haystack
 * @param {string[]} needles
 * @return {boolean}
 */
const rolesContain = (haystack, needles) => haystack.cache.some((role) => needles.includes(role.name));

/**
 * @param {Guild} guild
 * @param {User} user
 * @param {string[]} roleNames
 * @return {Promise<boolean>}
 */
const userIsInGuildWithRoles = async (guild, user, roleNames) => {
  const authorMembership = await guild.members.fetch(user.id);
  if (!authorMembership) return false;

  return rolesContain(authorMembership.roles, roleNames);
};

/**
 * @param {Message} msg
 * @return {boolean}
 */
const canManageHopper = async (msg) => await asyncSome(
    msg.client.guilds.cache.map((guild) => guild),
    (guild) => userIsInGuildWithRoles(guild, msg.author, whiteList.hopperManagementRoles),
);

/**
 * @param {Message} msg
 * @return {boolean}
 */
const canRequestCode = (msg) => whiteList.codeChannels.includes(msg.channel.name) &&
  rolesContain(msg.member.roles, whiteList.codeRoles);

module.exports = {
  canManageHopper,
  canRequestCode,
};
