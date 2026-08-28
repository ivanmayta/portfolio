export default function PrivacyPolicies() {
    return (
        <section className="flex flex-col pt-12 w-full max-w-2xl mx-auto gap-6">
            <h1 className="text-3xl font-bold">Política de Privacidad</h1>

            <div className="text-start space-y-6 prose prose-invert max-w-none">
                <p className="text-sm text-muted">
                    Última actualización:{" "}
                    {new Date().toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">1. Introducción</h2>
                    <p>
                        Esta Política de Privacidad describe cómo recopilamos,
                        utilizamos, compartimos y protegemos su información
                        personal cuando utiliza nuestros servicios a través de
                        Facebook Messenger y Facebook. Nos comprometemos a
                        proteger su privacidad y a ser transparentes sobre
                        nuestras prácticas de datos.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        2. Información que Recopilamos
                    </h2>
                    <p>Recopilamos los siguientes tipos de información:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong>
                                Información proporcionada por Facebook:
                            </strong>{" "}
                            Cuando utiliza nuestros servicios a través de
                            Messenger o Facebook, recibimos información de su
                            perfil de Facebook, incluyendo su nombre, foto de
                            perfil, ID de usuario de Facebook, y cualquier otra
                            información que autorice a compartir con nosotros.
                        </li>
                        <li>
                            <strong>Mensajes y conversaciones:</strong>{" "}
                            Recopilamos los mensajes y contenido que envía a
                            través de Messenger cuando interactúa con nuestros
                            servicios.
                        </li>
                        <li>
                            <strong>Información de uso:</strong> Recopilamos
                            información sobre cómo utiliza nuestros servicios,
                            incluyendo interacciones, preferencias y patrones de
                            uso.
                        </li>
                        <li>
                            <strong>Información técnica:</strong> Recopilamos
                            información técnica como direcciones IP, tipos de
                            navegador, sistema operativo, y otros datos técnicos
                            necesarios para proporcionar nuestros servicios.
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        3. Cómo Utilizamos su Información
                    </h2>
                    <p>Utilizamos la información recopilada para:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            Proporcionar, mantener y mejorar nuestros servicios
                            de conversación a través de Messenger y Facebook
                        </li>
                        <li>
                            Personalizar su experiencia y responder a sus
                            consultas y solicitudes
                        </li>
                        <li>
                            Enviar notificaciones y comunicaciones relacionadas
                            con nuestros servicios
                        </li>
                        <li>
                            Analizar y comprender cómo los usuarios utilizan
                            nuestros servicios
                        </li>
                        <li>
                            Detectar, prevenir y abordar problemas técnicos y de
                            seguridad
                        </li>
                        <li>
                            Cumplir con obligaciones legales y proteger nuestros
                            derechos
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        4. Compartir Información con Terceros
                    </h2>
                    <p>Compartimos información con las siguientes partes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong>Facebook/Meta:</strong> Como parte de la
                            integración con Facebook Messenger y Facebook,
                            compartimos información con Meta Platforms, Inc. de
                            acuerdo con sus políticas de datos y términos de
                            servicio.
                        </li>
                        <li>
                            <strong>Proveedores de servicios:</strong> Podemos
                            compartir información con proveedores de servicios
                            que nos ayudan a operar nuestros servicios, sujeto a
                            acuerdos de confidencialidad.
                        </li>
                        <li>
                            <strong>Requisitos legales:</strong> Podemos
                            divulgar información si es requerido por ley o para
                            proteger nuestros derechos y seguridad.
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        5. Integración con Facebook Messenger
                    </h2>
                    <p>
                        Nuestros servicios están integrados con Facebook
                        Messenger y Facebook. Al utilizar nuestros servicios,
                        usted autoriza a Facebook a compartir cierta información
                        con nosotros de acuerdo con las políticas de privacidad
                        de Facebook. Recomendamos revisar las políticas de
                        privacidad de Facebook para entender cómo manejan su
                        información.
                    </p>
                    <p>
                        La integración con Messenger nos permite recibir y
                        enviar mensajes en su nombre, acceder a información
                        básica de su perfil, y proporcionar funcionalidades de
                        conversación mejoradas.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        6. Cookies y Tecnologías Similares
                    </h2>
                    <p>
                        Utilizamos cookies y tecnologías similares para mejorar
                        su experiencia, analizar el uso de nuestros servicios y
                        personalizar el contenido. Puede controlar el uso de
                        cookies a través de la configuración de su navegador.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">7. Sus Derechos</h2>
                    <p>
                        Usted tiene los siguientes derechos respecto a su
                        información personal:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong>Acceso:</strong> Tiene derecho a acceder a
                            la información personal que tenemos sobre usted
                        </li>
                        <li>
                            <strong>Rectificación:</strong> Puede solicitar la
                            corrección de información inexacta o incompleta
                        </li>
                        <li>
                            <strong>Eliminación:</strong> Puede solicitar la
                            eliminación de su información personal en ciertas
                            circunstancias
                        </li>
                        <li>
                            <strong>Portabilidad:</strong> Tiene derecho a
                            recibir sus datos en un formato estructurado
                        </li>
                        <li>
                            <strong>Oposición:</strong> Puede oponerse al
                            procesamiento de su información personal en ciertas
                            circunstancias
                        </li>
                        <li>
                            <strong>Retirar consentimiento:</strong> Puede
                            retirar su consentimiento en cualquier momento
                        </li>
                    </ul>
                    <p>
                        Para ejercer estos derechos, puede contactarnos a través
                        de los canales indicados en la sección de contacto.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        8. Retención de Datos
                    </h2>
                    <p>
                        Conservamos su información personal durante el tiempo
                        necesario para cumplir con los propósitos descritos en
                        esta política, a menos que la ley requiera o permita un
                        período de retención más largo. Cuando ya no sea
                        necesario, eliminaremos su información de forma segura.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">9. Seguridad</h2>
                    <p>
                        Implementamos medidas de seguridad técnicas y
                        organizativas apropiadas para proteger su información
                        personal contra acceso no autorizado, alteración,
                        divulgación o destrucción. Sin embargo, ningún método de
                        transmisión por internet o almacenamiento electrónico es
                        100% seguro.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        10. Privacidad de Menores
                    </h2>
                    <p>
                        Nuestros servicios no están dirigidos a menores de 13
                        años (o la edad mínima requerida en su jurisdicción). No
                        recopilamos intencionalmente información personal de
                        menores. Si descubrimos que hemos recopilado información
                        de un menor sin el consentimiento de los padres,
                        tomaremos medidas para eliminar esa información.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        11. Transferencias Internacionales
                    </h2>
                    <p>
                        Su información puede ser transferida y procesada en
                        países diferentes al suyo. Al utilizar nuestros
                        servicios, usted consiente estas transferencias.
                        Implementamos salvaguardas apropiadas para proteger su
                        información en estas transferencias.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        12. Cambios a esta Política
                    </h2>
                    <p>
                        Podemos actualizar esta Política de Privacidad
                        ocasionalmente. Le notificaremos sobre cambios
                        significativos publicando la nueva política en esta
                        página y actualizando la fecha de &quot; Última
                        actualización&quot;. Le recomendamos revisar esta
                        política periódicamente.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">13. Contacto</h2>
                    <p>
                        Si tiene preguntas, inquietudes o solicitudes respecto a
                        esta Política de Privacidad o nuestras prácticas de
                        privacidad, puede contactarnos a través de:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Email: [su-email@ejemplo.com]</li>
                        <li>Sitio web: https://iverse.dev</li>
                    </ul>
                    <p className="text-sm text-muted mt-4">
                        Nota: Por favor, reemplace [su-email@ejemplo.com] con su
                        dirección de email real.
                    </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-line">
                    <p className="text-sm text-muted">
                        Esta política cumple con los requisitos del Portal de
                        Desarrolladores de Facebook para aplicaciones que
                        integran Messenger y conversaciones de Facebook.
                    </p>
                </div>
            </div>
        </section>
    )
}
