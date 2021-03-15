/**
 *  Location model
 *  Describes the characteristics of each attribute in a Location resource.
 *
 * @author gundupooja
 *
 */

module.exports = (db, DataTypes) => {
  db.define(
    'Location',
    {
      locationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      locationName: {
        type: DataTypes.STRING(30),
        unique: true,
        required: true,
        allowNull: false
      },
      locationLatitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
        validate: { min: -90, max: 90 }
      },
      locationLongitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false,
        validate: { min: -180, max: 180 }
      },
      locationValue: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      radius: {
        type: DataTypes.INTEGER,
        required: true,
      }
    });
  
  };
 
