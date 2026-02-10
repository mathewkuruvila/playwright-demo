import { test as base } from '@playwright/test';

type CustomConfigOptions = {
	mailUrl: string;
};

// export const test = base.extend<CustomConfigOptions>({
// 	mailUrl: [ 'default url', { option: true } ]
// })


type Account = {
  username: string;
  password: string;
};

type SharedData = {
  templateId: string;
  templateName: string;
}

export const test = base.extend<{
	sharedData : SharedData, name : string
}>({
	sharedData: async ({}, use) => {
		const data: SharedData = {
			templateId: '12345',
			templateName: 'asfd'
		};
		await use(data);
	},

	name : async ({}, use) => {
		const name = 'test';
		await use(name);
	}
});
						




// export const test = base.extend<{}, { account: Account }>({
//   account:  [async ({}, use, workerInfo) => {
   
//     const username = 'user' + workerInfo.workerIndex;
//     const password = 'verysecure';
// 	let account: Account = {
// 	  username: username,	
// 	  password: password
// 	};
//     await use(account);
//   }, { scope: 'worker' }],


// });

export const tests = base.extend<CustomConfigOptions>({
	mailUrl: [
		async ({ mailUrl }, use) => {
			console.log(mailUrl);
			await use(mailUrl);
		},
		{ option: true },
	]
})