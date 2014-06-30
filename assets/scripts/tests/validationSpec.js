define( [ '../modules/Validation', '../utils/jquery', '../utils/jasmine-fixture', '../utils/jasmine-jquery' ], function( Validation ) {

	/**
	 * Validation tests container
	 */
	describe( 'Validation tests container', function() {

		var validation;

		beforeEach( function() {
			validation = new Validation();
		});

		/**
		 * Validation initial tests
		 */
		describe( 'Validation initial tests', function() {

			it( 'Checks that the initial validation result is true', function() {
				expect( validation.pass ).toBe( true );
			});
		});

		/**
		 * Validation email tests
		 */
		describe( "Validation email tests", function() {

			it( 'Testing a valid email address', function() {
				expect( validation.email( 'davidjones@stormcreative.co.uk' ) ).toBe( true );
			});

			it( 'Testing a valid email address - alternative', function() {
				expect( validation.email( 'davidjones1@stormcreative.co.uk' ) ).toBe( true );
			});

			it( 'Testing a invalid email address - Missing @', function() {
				expect( validation.email( 'davidjonesstormcreative.co.uk' ) ).toBe( false );
			});

			it( 'Testing a invalid email address - Missing .co.uk', function() {
				expect( validation.email( 'davidjones@stormcreative' ) ).toBe( false );
			});
		});

		/**
		 * Validation password tests
		 */
		describe( 'Validation password tests', function() {

			it( 'Testing a good password', function() {
				expect( validation.password( 'helloworld1' ) ).toBe( true );
			});

			it( 'Testing the minimum length', function() {
				expect( validation.password( 'test' ) ).toBe( false );
			});

			it( 'Testing the maximum length', function() {
				expect( validation.password( 'testtesttesttesttesttest' ) ).toBe( false );
			});

			it( 'Testing as password with no numbers in it', function() {
				expect( validation.password( 'helloworld' ) ).toBe( false );
			});
		});

		/**
		 * Validation phone tests
		 */
		describe( 'Validation phone tests', function() {

			it( 'Testing a valid phone number', function() {
				expect( validation.phone( '01702556107' ) ).toBe( true );
			});

			it( 'Testing a invalid phone number - Has letters', function() {
				expect( validation.phone( '017025hello' ) ).toBe( false );
			});
		});

		/**
		 * Validation process tests
		 */
		describe( 'Validation process tests', function() {

			/**
			 * To make each test case look a bit nicer we will define a working DOM here
			 * then in each thing we are testing we will remove the value or manipulate it 
			 * in some way to simulate wrong input;
			 */
			beforeEach( function() {

				var $dom = [ 'input[class="js-validate"][name="user[firstname]"][value="David"][data-type="firstname"]',
							 'span[class="js-firstname-error"][style="display: none;"]',

							 'input[class="js-validate"][name="user[lastname]"][value="Jones"][data-type="lastname"]',
							 'span[class="js-lastname-error"][style="display: none;"]',

							 'input[class="js-validate js-validate-email js-match"][name="user[email]"][value=""][data-type="email"][data-second-type="email-format"][data-match="email-match"]',
							 'span[class="js-email-error"][style="display: none;"]',
							 'span[class="js-email-format-error"][style="display: none;"]',

							 'input[class="js-validate js-validate-email js-email-match"][name="user[confirm_email]"][value=""][data-type="confirm-email"][data-second-type="confirm-email-format"]',
							 'span[class="js-confirm-email-error"][style="display: none;"]',
							 'span[class="js-confirm-email-format-error"][style="display: none;"]',
							 'span[class="js-email-match-error"][style="display: none;"]',

							 'input[class="js-validate js-validate-password js-match"][name="user[password]"][value="password11"][data-type="password"][data-second-type="password-strength"][data-match="password-match"]',
							 'span[class="js-password-error"][style="display: none;"]',
							 'span[class="js-password-strength-error"][style="display: none;"]',

							 'input[class="js-validate js-validate-password js-password-match"][name="user[confirm_password]"][value="password11"][data-type="confirm-password"][data-second-type="confirm-password-strength"]',
							 'span[class="js-confirm-password-error"][style="display: none;"]',
							 'span[class="js-confirm-password-strength-error"][style="display: none;"]',
							 'span[class="js-password-match-error"][style="display: none;"]',

							 'input[class="js-validate js-validate-phone"][name="user[phone]"][value="123456789"][data-type="phone"]',
							 'span[class="js-phone-error"][style="display: none;"]',

							 'input[class="submit"][name="submit"][value="Submit"]' ];

				var $container = affix( '#form form' ),
					l = $dom.length,
					i;

				for( i = 0; i < l; i++ ) {
					$container.affix( $dom[ i ] );
				}
			});

			it( 'Testing the validation passes with the correct data', function() {

				/**
				 * The fixture generator didn't like having a email address
				 * as a form value so we will have to add it when we need it
				 */
				$( 'input[name="user[email]"]' ).val( 'davidjones@stormcreative.co.uk' );
				$( 'input[name="user[confirm_email]"]' ).val( 'davidjones@stormcreative.co.uk' );

				validation.process( $( '.js-validate' ) );
				expect( validation.pass ).toBe( true );
			});

			/**
			 * First name is NULL tests
			 */
			describe( 'Testing the validation fails and the correct error message is shown if the firstname is null', function() {

				beforeEach( function() {
					$( 'input[name="user[firstname]"]' ).val( '' );
					validation.process( $( '.js-validate' ) );
				});

				it( 'Testing the validation fails if the first name field is null', function() {
					expect( validation.pass ).toBe( false );
				});

				it( 'Testing the first name error is visible on the page', function() {
					expect( $( '.js-firstname-error' ) ).toBeVisible();
				});
			});

			/**
			 * Last name is NULL tests
			 */
			describe( 'Testing the validation fails and the correct error message is shown if the last name is null', function() {

				beforeEach( function() {
					$( 'input[name="user[lastname]"]' ).val( '' );
					validation.process( $( '.js-validate' ) );
				});

				it( 'Testing', function() {
					expect( $( 'input[name="user[lastname]"]' ).val() ).toBe( '' );
				});

				it( 'Testing the validation returns false if the lastname field is null', function() {
					expect( validation.pass ).toBe( false );
				});

				it( 'Testing the last name error is visible on the page', function() {
					expect( $( '.js-lastname-error' ) ).toBeVisible();
				});
			});

			/**
			 * Email address is NULL tests
			 */
			describe( 'Testing the validation fails and the correct error message is shown if the email is null', function() {

				beforeEach( function() {
					$( 'input[name="user[email]"]' ).val( '' );
					$( 'input[name="user[confirm_email]"]' ).val( 'davidjones@stormcreative.co.uk' );
					validation.process( $( '.js-validate' ) );
				});

				it( 'Testing the validation is false', function() {
					expect( validation.pass ).toBe( false );
				});

				it( 'Testing the email is missing error is visible on the page', function() {
					expect( $( '.js-email-error' ) ).toBeVisible();
				});
			});

			/**
			 * Email address is in the wrong format tests
			 */
			describe( 'Testing the validation fails and the correct error message is shown if the email is in the incorrect format', function() {

				beforeEach( function() {
					$( 'input[name="user[email]"]' ).val( 'davidjonesstormcreative.co.uk' );
					$( 'input[name="user[confirm_email]"]' ).val( 'davidjonesstormcreative.co.uk' );
					validation.process( $( '.js-validate' ) );
				});

				it( 'Testing the validation is false', function() {
					expect( validation.pass ).toBe( false );
				});

				it( 'Testing the correct error message is displayed to the user', function() {
					expect( $( '.js-email-format-error' ) ).toBeVisible();
				});
			});

			/**
			 * Confirm email address is NULL tests
			 */
			describe( 'Testing the validation fails and the correct error message fails if the users confirm email is null', function() {

				beforeEach( function() {
					$( 'input[name="user[confirm_email]"]' ).val( '' );
					validation.process( $( '.js-validate' ) );
				});

				it( 'Testing the validation is false', function() {
					expect( validation.pass ).toBe( false );
				});

				it( 'Testing the correct message is displayed to the user', function() {
					expect( $( '.js-confirm-email-error' ) ).toBeVisible();
				});
			});

			/**
			 * Confirm email address is in the wrong format
			 */
			describe( 'Testing the validation fails and the correct error message appears in the confirm email is in the wrong format', function() {

				beforeEach( function() {
					$( 'input[name="user[confirm_email]"]' ).val( 'davidjonesstormcreative.co.uk' );
					validation.process( $( '.js-validate' ) );
				});

				it( 'Testing the validation is false', function() {
					expect( validation.pass ).toBe( false );
				});

				it( 'Testing the correct error message is shown if the confirm email address is in the wrong format', function() {
					expect( $( '.js-confirm-email-format-error' ) ).toBeVisible();
				});
			});

			/**
			 * Make sure the match validation works correctly on the email addresses
			 */
			describe( 'Testing the match validation on the email address for both valid and invalid input', function() {

				it( 'Test the validation passed if two email addresses are the same', function() {
					$( 'input[name="user[email]"]' ).val( 'davidjones@stormcreative.co.uk' );
					$( 'input[name="user[confirm_email]"]' ).val( 'davidjones@stormcreative.co.uk' );
					validation.process( $( '.js-validate' ) );
					expect( validation.pass ).toBe( true );
				});
			});

			/**
			 * Make sure the match validation makes the validation fail if the email addresses do not match
			 */
			describe( 'Testing the validation fails with email addresses that do not match', function() {

				beforeEach( function() {
					$( 'input[name="user[email]"]' ).val( 'david@stormcreative.co.uk' );
					$( 'input[name="user[confirm_email]"]' ).val( 'davidjones@stormcreative.co.uk' );
					validation.process( $( '.js-validate' ) );
				});

				it( 'Non-matching email addresses makes the validation false', function() {
					expect( validation.pass ).toBe( false );
				});

				it( 'The non-matching email address error gets inserted to the DOM', function() {
					expect( $( '.js-email-match-error' ) ).toBeVisible();
				});
			});

			/**
			 * Password is NULL tests
			 */
			describe( 'Testing the validation fails if the password is null', function() {

				beforeEach( function() {
					$( 'input[name="user[password]"]' ).val( '' );
					validation.process( $( '.js-validate' ) );
				});

				it( 'The validation will fail if the password is null', function() {
					expect( validation.pass ).toBe( false );
				});

				it( 'The error message will be visible if the password is null', function() {
					expect( $( '.js-password-error' ) ).toBeVisible();
				});
			});

			/**
			 * Password fails the strength test
			 */
			describe( 'If the password fails the strength test we need to make sure the validation fails and the error message is displayed', function() {

				beforeEach( function() {
					$( 'input[name="user[password]"]' ).val( 'test' );
					validation.process( $( '.js-validate' ) );
				});

				it( 'The validation should fail if the password is not strong enough', function() {
					expect( validation.pass ).toBe( false );
				});

				it( 'The password strength error should be displayed', function() {
					expect( $( '.js-password-strength-error' ) ).toBeVisible();
				});
			});

			/**
			 * Confirm password id NULL tests
			 */
			describe( 'Testing the validation fails if the confirm password is null', function() {

				beforeEach( function() {
					$( 'input[name="user[confirm_password]"]' ).val( '' );
					validation.process( $( '.js-validate' ) );
				});

				it( 'The validation should fail if the the confirm password is null', function() {
					expect( validation.pass ).toBe( false );
				});

				it( 'The null error for the confirm password field should show', function() {
					expect( $( '.js-confirm-password-error' ) ).toBeVisible();
				});
			});

			/**
			 * Confirm password fails the strength test
			 */
			describe( 'Testing the validation fails ', function() {

				beforeEach( function() {
					$( 'input[name="user[confirm_password]"]' ).val( 'test' );
					validation.process( $( '.js-validate' ) );
				});

				it( 'The validation should fail if the confirm password is not strong enough', function() {
					expect( validation.pass ).toBe( false );
				});

				it( 'The confirm password strength error message should be visible', function() {
					expect( $( '.js-confirm-password-strength-error' ) ).toBeVisible();
				});
			});

			/**
			 * Password and confirm password match tests
			 */
			describe( 'Testing the validation failing and the error message showing if the password and confirm password do not match', function() {

				beforeEach( function() {
					$( 'input[name="user[password]"]' ).val( 'password11' );
					$( 'input[name="user[confirm_password]"]' ).val( 'pasword1' );
					validation.process( $( '.js-validate' ) );
				});

				it( 'The validation should fail if the password and confirm password do not match', function() {
					expect( validation.pass ).toBe( false );
				});

				it( 'The error for mismatching passwords should be visible', function() {
					expect( $( '.js-password-match-error' ) ).toBeVisible();
				});
			});
 
			afterEach( function() {
				$( '#form' ).remove();
			});
		});
	});
});