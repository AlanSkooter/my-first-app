import * as petsModel from '../model/pets.mjs';

export const getPets = () => {
    const pets = petsModel.fetchAllPets();
    if (!pets.length) {
        return getNotFoundResponse(res);
    }
    return pets;
}

export const uploadPet = (req, res) => new Promise((resolve, reject) => {
  const form = petsModel.upload();
  form.parse(req, async (err) => {
      if (err) {
          return reject(err)
      }
      resolve({
        code: 200
      });
  });
});