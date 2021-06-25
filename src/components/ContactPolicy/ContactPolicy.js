import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import HeaderSection from '../shared/HeaderSection/HeaderSection';
import { Breadcrumb, BreadcrumbItem } from '../shared/Breadcrumb/Breadcrumb';
import { FormattedMessageMarkdown } from '../../i18n/FormattedMessageMarkdown';
import { Switch } from '../shared/Switch/Switch';
import { FieldGroup, FieldItem, NumberField, SubmitButton } from '../form-helpers/form-helpers';
import { Form, Formik } from 'formik';
import useTimeout from '../../hooks/useTimeout';

export const ContactPolicy = () => {
  const [active, toggleActive] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const intl = useIntl();
  const _ = (id, values) => intl.formatMessage({ id: id }, values);

  const fieldNames = {
    amount: 'amount',
    interval: 'interval',
  };

  const getFormInitialValues = () => {
    return Object.keys(fieldNames).reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        [currentValue]: '',
      }),
      {},
    );
  };

  //TODO: refactor next block. (just to simulate form submission)
  //BEGIN BLOCK
  const createTimeout = useTimeout();
  const submitContactPolicyForm = async (values, { setSubmitting }) => {
    setFormSubmitted(false);
    await new Promise((resolve) => {
      createTimeout(() => {
        resolve(true);
      }, 1000);
    });
    setFormSubmitted(true);
    setSubmitting(false);
  };
  //END BLOCK

  return (
    <>
      <Helmet>
        <title>{_('contact_policy.meta_title')}</title>
      </Helmet>
      <HeaderSection>
        <div className="col-sm-12 col-md-12 col-lg-12">
          <Breadcrumb>
            <BreadcrumbItem href={_('common.control_panel_url')} text={_('common.control_panel')} />
            <BreadcrumbItem text={_('contact_policy.title')} />
          </Breadcrumb>
          <h2>{_('contact_policy.title')}</h2>
          <FormattedMessageMarkdown linkTarget={'_blank'} id="contact_policy.subtitle_MD" />
        </div>
      </HeaderSection>
      <section className="dp-container">
        <div className="dp-rowflex">
          <div className="col-lg-6 col-md-12 col-sm-12 m-b-24">
            <Formik onSubmit={submitContactPolicyForm} initialValues={getFormInitialValues()}>
              <Form className="dp-contact-policy-form">
                <fieldset>
                  <legend>{_('contact_policy.title')}</legend>
                  <FieldGroup>
                    <FieldItem className="field-item">
                      <Switch
                        id="contact-policy-switch"
                        text={_('contact_policy.toggle_text')}
                        defaultChecked={active}
                        onChange={(value) => {
                          toggleActive(value);
                          setFormSubmitted(false);
                        }}
                      />
                    </FieldItem>

                    <FieldItem className="field-item">
                      <div className="dp-item-block">
                        <div>
                          <span>{_('contact_policy.amount_description')}</span>
                          <NumberField
                            name={fieldNames.amount}
                            id="contact-policy-input-amount"
                            disabled={!active}
                            required
                          />
                          <span className="m-r-6">{_('common.emails')}</span>
                        </div>
                        <div>
                          <span>{_('contact_policy.interval_description')}</span>
                          <NumberField
                            name={fieldNames.interval}
                            id="contact-policy-input-interval"
                            disabled={!active}
                            required
                          />
                          <span>{_('contact_policy.interval_unit')}</span>
                        </div>
                      </div>
                    </FieldItem>

                    {formSubmitted ? (
                      <FieldItem className="field-item">
                        <div className="dp-wrap-message dp-wrap-success bounceIn">
                          <span className="dp-message-icon" />
                          <div className="dp-content-message">
                            <p>{_('contact_policy.success_msg')}</p>
                          </div>
                        </div>
                      </FieldItem>
                    ) : null}

                    <FieldItem className="field-item">
                      <hr />
                    </FieldItem>

                    <FieldItem className="field-item">
                      <a
                        href={_('common.control_panel_url')}
                        className="dp-button button-medium primary-grey"
                      >
                        {_('common.back')}
                      </a>

                      <span className="align-button m-l-24">
                        <SubmitButton>{_('common.save')}</SubmitButton>
                      </span>
                    </FieldItem>
                  </FieldGroup>
                </fieldset>
              </Form>
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};
