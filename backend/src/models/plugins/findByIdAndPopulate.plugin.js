/* eslint-disable no-param-reassign */

const findByIdAndPopulate = (schema) => {
  /**
   * @typedef {Object} populate Document
   * @property {Document[]} results - Results found

   */
  /**
   * Query for documents with pagination
   * @param {string} populate - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.findByIdAndPopulate = async function (id, populate) {
    let docsPromise = this.findById(id);
    if (populate) {
      populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        );
      });
    }

    return docsPromise.exec();

    // return Promise.all(docsPromise).then((values) => {
    //   return Promise.resolve(values);
    // });
  };
};

module.exports = findByIdAndPopulate;
