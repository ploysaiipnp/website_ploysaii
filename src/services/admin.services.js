import { useMutation, useQuery } from "react-query";
import createRequest from "../utils/request";

const adminService = {
  useQueryGetPromotion({ onSuccess, onError }) {
    return useQuery(
      ["getPromotion"],
      async () => {
        const path = `/promotion/getAll`;
        try {
          const res = await createRequest.post(path);
          return res?.data;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    );
  },
  useQueryGetOrder({ queryObj, onSuccess, onError }) {
    return useQuery(
      ["getOrder"],
      async () => {
        const path = `/order/searchOrder`;
        try {
          const res = await createRequest.post(path, queryObj);
          return res?.data;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    );
  },
  useQueryGetHighlight({ onSuccess, onError }) {
    return useQuery(
      ["getHighlight"],
      async () => {
        const path = `/highlight/getAll`;
        try {
          const res = await createRequest.post(path);
          return res?.data;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    );
  },

  // ---------------------------------- useMutation -------------------

  useMutationLogin(onSuccess, onError) {
    return useMutation(
      async (values) => {
        const { username, password } = values;
        const path = `/admin/login`;
        const query = { username, password };
        try {
          const res = await createRequest.post(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },
  useMutationRegister(onSuccess, onError) {
    return useMutation(
      async (values) => {
        const { phone, username, password } = values;
        const path = `/admin`;
        const query = {
          phone,
          username,
          password,
        };
        try {
          const res = await createRequest.post(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },

  useMutationGetUser(onSuccess, onError) {
    return useMutation(
      async (values) => {
        const { id } = values;
        const path = `/admin/${id}`;
        try {
          const res = await createRequest.post(path);
          return res.data;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },

  useMutationUpdateProfile(onSuccess, onError) {
    return useMutation(
      async ({ values }) => {
        const path = `/user/updateUserProfile`;
        const query = { ...values };
        try {
          const res = await createRequest.put(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },

  useMutationCreateProduct(onSuccess, onError) {
    return useMutation(
      async ({ values }) => {
        const path = `/product`;
        const query = { ...values };
        try {
          const res = await createRequest.post(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },
  useMutationEditProduct(onSuccess, onError) {
    return useMutation(
      async ({ productId, values }) => {
        const path = `/product/${productId}`;
        const query = { ...values };
        try {
          const res = await createRequest.put(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },

  useMutationCreatePromotion(onSuccess, onError) {
    return useMutation(
      async ({ values }) => {
        const path = `/promotion`;
        const query = values;
        try {
          const res = await createRequest.post(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },
  useMutationEditPromotion(onSuccess, onError) {
    return useMutation(
      async ({ promotionId, values }) => {
        const path = `/promotion/${promotionId}`;
        const query = values;
        try {
          const res = await createRequest.put(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },
  useMutationApproveOrder(onSuccess, onError) {
    return useMutation(
      async ({ values }) => {
        const path = `/order/updateStatusOrder`;
        const query = values;
        try {
          const res = await createRequest.put(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },

  useMutationCreateHighlight(onSuccess, onError) {
    return useMutation(
      async ({ values }) => {
        const path = `/highlight`;
        const query = values;
        try {
          const res = await createRequest.post(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },
  useMutationUpdateHighlight(onSuccess, onError) {
    return useMutation(
      async ({ values }) => {
        const path = `/highlight`;
        const query = values;
        try {
          const res = await createRequest.put(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },
};

export default adminService;
