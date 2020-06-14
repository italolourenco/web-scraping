/**
 * @swagger
 *  components:
 *    schemas:
 *      ExtensionResume:
 *        type: object
 *        properties:
 *          extension:
 *            type: string
 *            description: File Extension
 *          lines:
 *            type: number
 *            description: Number of lines of this extension
 *          bytes:
 *            type: number
 *            description: Number of bytes of this extension
 *        example:
 *           extension: 'js'
 *           lines: 666
 *           bytes: 666
 *      RepositoryResume:
 *        type: object
 *        description: File Extension
 *        properties:
 *          results:
 *            type: array
 *            items: 
 *              $ref: '#/components/schemas/ExtensionResume'
 * 
 */
export class ExtensionResume {
    extension: string
    lines: number
    bytes: number
}