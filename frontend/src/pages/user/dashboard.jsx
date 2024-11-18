import React, { useEffect, useState } from 'react';
import { Eye, Pencil, Trash2, Plus, RefreshCcw, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { authService } from '../../services/auth.service';
import { useToast } from "@/hooks/use-toast"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


const PatientSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  dob: Yup.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .required('Date of birth is required'),
});

const PatientDashboard = () => {
  const { toast } = useToast()
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTestOpen, setIsTestOpen] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    fetchPatients()
  }, [])


  const fetchPatients = async () => {
    setIsTestOpen(false)
    try {
      let result = await authService.getPatients();
      if (result && Array.isArray(result)) {
        setPatients(result)
      }
    }
    catch (er) {
      toast({
        description: er?.message,
      })
      console.log(er)
    }

  }

  const handleDelete = async (id) => {
    try {
      let result = await authService.deletePatients(id);
      if (result) {
        toast({
          description: "Patient deleted successfully"
        })
      }
    }
    catch (er) {
      toast({
        description: er?.message,
      })
      console.log(er)
    }
    finally {
      fetchPatients()
    }
  };

  const handleEdit = async (patient) => {
    try {
      let result = await authService.updatePatients(patient.id, patient);
      if (result) {
        toast({
          description: "Patient updated successfully"
        })
      }
    }
    catch (er) {
      toast({
        description: er?.message,
      })
      console.log(er)
    }
    finally {
      fetchPatients()

    }
    setIsEditOpen(false);
  };

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Patient Details</h2>
            <Button
              onClick={onClose}
            >
              ✕
            </Button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const ViewDialog = ({ patient, onClose }) => (
    <Modal isOpen={isViewOpen} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="mt-1">{patient.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1">{patient.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <p className="mt-1">{patient.dob}</p>
        </div>
      </div>
    </Modal>
  );

  const EditDialog = ({ patient, onSave, onClose }) => {
    return (
      <Modal isOpen={isEditOpen} onClose={onClose}>
        <Formik
          initialValues={{
            name: patient.name,
            email: patient.email,
            dob: patient.dob,
          }}
          validationSchema={PatientSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSave({ ...patient, ...values });
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <Field
                  name="name"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                />
                {errors.name && touched.name ? (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                ) : null}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                />
                {errors.email && touched.email ? (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                ) : null}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <Field
                  name="dob"
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                />
                {errors.dob && touched.dob ? (
                  <div className="text-red-500 text-sm mt-1">{errors.dob}</div>
                ) : null}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    );
  };

  const handleAdd = async (newPatient) => {
    try {
      let result = await authService.addPatients(newPatient);
      if (result) {
        toast({
          description: "Patient Added successfully"
        })
      }
    }
    catch (er) {
      toast({
        description: er?.message,
      })
      console.log(er)
    }
    finally {
      fetchPatients()

    }
    setIsAddOpen(false);
  };


  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }

  const handleTest = async () => {
    setIsTestOpen(true)

    try {
      let result = await authService.testPatients();
      if (result) {
        setPatients(result)
      }
    }
    catch (er) {
      toast({
        description: er?.message,
      })
      console.log(er)
    }
  }

  const AddPatientDialog = ({ isOpen, onClose, onAdd }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
          <Formik
            initialValues={{
              name: '',
              email: '',
              dob: '',
            }}
            validationSchema={PatientSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              onAdd({ ...values }); // Generate temporary ID
              setSubmitting(false);
              resetForm();
              onClose();
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <Field
                    name="name"
                    type="text"
                    className={`mt-1 block w-full rounded-md shadow-sm p-2 border ${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className={`mt-1 block w-full rounded-md shadow-sm p-2 border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <Field
                    name="dob"
                    type="date"
                    className={`mt-1 block w-full rounded-md shadow-sm p-2 border ${errors.dob && touched.dob ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.dob && touched.dob && (
                    <div className="text-red-500 text-sm mt-1">{errors.dob}</div>
                  )}
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Adding...' : 'Add Patient'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    );
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Patients Dashboard</h1>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsAddOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Patient
            </Button>

            {
              !isTestOpen && (
                <Button
                  onClick={handleTest}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Filter Test Patient
                </Button>
              )
            }


            {isTestOpen && (
              <Button
                onClick={fetchPatients}
                className="flex items-center gap-2"
              >
                <RefreshCcw className="h-4 w-4" />
                Clear Test
              </Button>
            )}
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-x-auto mt-5">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="text-left">
                  <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.dob}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => {
                          setSelectedPatient(patient);
                          setIsViewOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedPatient(patient);
                          setIsEditOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(patient.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedPatient && isViewOpen && (
          <ViewDialog
            patient={selectedPatient}
            onClose={() => {
              setIsViewOpen(false);
              setSelectedPatient(null);
            }}
          />
        )}

        {selectedPatient && isEditOpen && (
          <EditDialog
            patient={selectedPatient}
            onSave={handleEdit}
            onClose={() => {
              setIsEditOpen(false);
              setSelectedPatient(null);
            }}
          />
        )}

        {isAddOpen && (
          <AddPatientDialog
            isOpen={isAddOpen}
            onClose={() => setIsAddOpen(false)}
            onAdd={handleAdd}
          />
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;