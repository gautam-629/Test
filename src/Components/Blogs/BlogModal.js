


// import React from 'react';
// import { useState } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
// import { Fragment } from 'react';

// const BlogModal = ({ isOpen, closeModal }) => {
// 	return (
// 		<Transition appear show={isOpen} as={Fragment}>
// 			<Dialog as="div" className="relative z-40 w-screen" onClose={closeModal}>
// 				{/* for overlay */}
// 				<Transition.Child
// 					as={Fragment}
// 					enter="ease-out duration-300"
// 					enterFrom="opacity-0"
// 					enterTo="opacity-100"
// 					leave="ease-in duration-200"
// 					leaveFrom="opacity-100"
// 					leaveTo="opacity-0"
// 				>
// 					<div className="fixed inset-0 bg-black bg-opacity-40" />
// 				</Transition.Child>

// 				{/* modal body */}
// 				<div className="fixed inset-0 z-30 overflow-y-auto">
// 					<div className="flex min-h-full items-center justify-center p-4 text-center">
// 						<Transition.Child
// 							as={Fragment}
// 							enter="ease-out duration-300"
// 							enterFrom="opacity-0 scale-95"
// 							enterTo="opacity-100 scale-100"
// 							leave="ease-in duration-200"
// 							leaveFrom="opacity-100 scale-100"
// 							leaveTo="opacity-0 scale-95"
// 						>
// 							<Dialog.Panel className="relative w-[90%] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
// 								<div className="flex">
// 									<div>
// 										<p>www.froxjob.com Comment Policy</p>
// 										<p>
// 											Please read our{' '}
// 											<span className="text-orange">Comment Policy</span> before
// 											commenting.
// 										</p>
// 									</div>
// 									<button onClick={closeModal}>Got it</button>
// 								</div>
// 								<button className="border-black">Got it</button>
// 							</Dialog.Panel>
// 						</Transition.Child>
// 					</div>
// 				</div>
// 			</Dialog>
// 		</Transition>
// 	);
// };

// export default BlogModal;




