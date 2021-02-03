'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    url: DataTypes.STRING
  }, {});
  Image.associate = function (models) {
    const detailImageMap = {
      through: models.EventDetailImage,
      foreignKey: 'imageId',
      otherKey: 'eventId'
    };
    // Image.belongsToMany(models.Event, detailImageMap);
  };
  return Image;
};
