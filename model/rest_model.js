module.exports = (sequelize, DataTypes, Model) => {
  class REST extends Model {}

  REST.init({
    sno: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    last_update: {
      type: DataTypes.DATEONLY,
    },
    observation_date: {
      type: DataTypes.DATEONLY,
    },
    confirmed: {
      type: DataTypes.INTEGER,
    },
    deaths: {
      type: DataTypes.INTEGER,
    },
    recovered: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    noPrimaryKey: true,
    timestamps: false,
    modelName: 'covid_observations'
  });

  REST.removeAttribute('id');

  return REST;
};
