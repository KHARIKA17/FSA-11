/**
 *  Location model
 *  Describes the characteristics of each attribute in a Location resource.
 *
 * @author Denise Case <dcase@nwmissouri.edu>
 *
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 * https://sequelize.org/master/manual/validations-and-constraints.html
 *
 * For validators see: https://github.com/validatorjs/validator.js
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (db, DataTypes) => {
  db.define(
    'Location',
    {
      // sqlite creates a rowid attribute automatically
      name: {
        type: DataTypes.STRING(50),
      },
    },
<<<<<<< HEAD
    {
      // Other model options go here
=======
    locationName:{
      type: DataTypes.STRING(30),
      unique: true,
      required: true,
      allowNull: false
    },
    locationLatitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false
    },
    locationLongitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false
    },

    locationValue: {
      type: DataTypes.INTEGER,
      allowNull: false
>>>>>>> 77ac4a2f70941a39d0359c593278e02e524cd0f8
    }
  );
};
